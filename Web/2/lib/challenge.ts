import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";

const DEFAULT_TTL_MS = 10 * 60 * 1000;
const DEFAULT_DIFFICULTY = 5;

const CTF_FLAG = process.env.CTF_FLAG ?? "CH4KR4X2{P0D5_c0bb13_1nj3ct}";
const TTL_MS = Number(process.env.CHALLENGE_TTL_MS ?? DEFAULT_TTL_MS);
const POW_DIFFICULTY = Number(process.env.POW_DIFFICULTY ?? DEFAULT_DIFFICULTY);
const SIGNING_KEY =
  process.env.CHALLENGE_SIGNING_KEY ?? "4eaf79e77d60ff3f452b193e5cefbccede4357b064a4594afff62a7d4a665646";

type SignedTicket = {
  jti: string;
  nonce: string;
  exp: number;
};

type VerifyInput = {
  challengeId: string;
  proof: string;
  encodedPayload: string;
};

type VerifyResult = {
  ok: boolean;
  status: number;
  message: string;
  flag?: string;
};

function hexSha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(
    new Uint8Array(aBuf.buffer, aBuf.byteOffset, aBuf.byteLength),
    new Uint8Array(bBuf.buffer, bBuf.byteOffset, bBuf.byteLength)
  );
}

function b64UrlEncode(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function b64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, "base64").toString("utf8");
}

function signSegment(segment: string): string {
  return createHmac("sha256", SIGNING_KEY)
    .update(segment)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function issueSignedTicket(ticket: SignedTicket): string {
  const payload = b64UrlEncode(JSON.stringify(ticket));
  const signature = signSegment(payload);
  return `${payload}.${signature}`;
}

function verifySignedTicket(ticket: string): SignedTicket | null {
  const [payload, signature] = ticket.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expected = signSegment(payload);
  if (!safeCompare(signature, expected)) {
    return null;
  }

  try {
    const parsed = JSON.parse(b64UrlDecode(payload)) as SignedTicket;
    if (
      typeof parsed.jti !== "string" ||
      typeof parsed.nonce !== "string" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function strictBase64Decode(input: string): string {
  if (!/^[A-Za-z0-9+/=]+$/.test(input) || input.length % 4 !== 0) {
    throw new Error("payload format invalid");
  }

  const decoded = Buffer.from(input, "base64").toString("utf8");
  const normalized = Buffer.from(decoded, "utf8").toString("base64");
  if (!safeCompare(normalized, input)) {
    throw new Error("payload integrity failed");
  }

  return decoded;
}

function checkProofOfWork(nonce: string, proof: string): boolean {
  const digest = hexSha256(`${nonce}:${proof}`);
  return digest.startsWith("0".repeat(POW_DIFFICULTY));
}

function blocksCommonInjection(payload: string): boolean {
  const blocked = [
    /\bunion\b/i,
    /\bselect\b\s+\*/i,
    /\binformation_schema\b/i,
    /\bbenchmark\b/i,
    /\bsleep\s*\(/i,
    /\bwaitfor\b/i,
    /\bload_file\b/i,
    /\binto\s+outfile\b/i,
    /\bdrop\b\s+table\b/i,
    /\binsert\b\s+into\b/i,
    /\bupdate\b\s+\w+\s+set\b/i,
    /\bdelete\b\s+from\b/i,
    /--/,
    /;/,
    /\b(or|and)\b\s+\d+\s*=\s*\d+/i,
    /\b(or|and)\b\s+['\"][^'\"]+['\"]\s*=\s*['\"][^'\"]+['\"]/i,
    /\bor\b\s+1=1/i,
    /\badmin\b\s*'\s*#/i,
  ];

  return blocked.some((pattern) => pattern.test(payload));
}

function isRareAllowedInjection(payload: string, nonce: string, proof: string): boolean {
  const expected = `admin' OR JSON_UNQUOTE(JSON_EXTRACT('{\\"k\\":\\"${nonce}:${proof}\\"}','$.k'))='${nonce}:${proof}' AND ST_Distance_Sphere(POINT(0,0),POINT(0,0))=0 AND 'x' LIKE 'x`;
  return safeCompare(payload, expected);
}

export function issueChallenge(): {
  challengeId: string;
  seed: string;
  difficulty: number;
  expiresInMs: number;
  noise: string;
} {
  const jti = randomBytes(16).toString("hex");
  const nonce = randomBytes(12).toString("hex");
  const exp = Date.now() + TTL_MS;
  const challengeId = issueSignedTicket({ jti, nonce, exp });

  return {
    challengeId,
    seed: nonce,
    difficulty: POW_DIFFICULTY,
    expiresInMs: TTL_MS,
    noise: hexSha256(`${jti}:${nonce}`).slice(0, 32),
  };
}

export function verifyChallenge(input: VerifyInput): VerifyResult {
  const ticket = verifySignedTicket(input.challengeId);
  if (!ticket) {
    return { ok: false, status: 400, message: "challenge expired or invalid" };
  }

  if (Date.now() > ticket.exp) {
    return { ok: false, status: 400, message: "challenge expired" };
  }

  if (!checkProofOfWork(ticket.nonce, input.proof)) {
    return { ok: false, status: 403, message: "proof of work invalid" };
  }

  let decodedOnce: string;
  let decodedTwice: string;
  try {
    decodedOnce = strictBase64Decode(input.encodedPayload);
    decodedTwice = strictBase64Decode(decodedOnce);
  } catch {
    return { ok: false, status: 400, message: "double base64 decode failed" };
  }

  if (decodedTwice.length < 40 || decodedTwice.length > 400) {
    return { ok: false, status: 400, message: "payload length invalid" };
  }

  if (blocksCommonInjection(decodedTwice)) {
    return { ok: false, status: 403, message: "common injection blocked" };
  }

  if (!isRareAllowedInjection(decodedTwice, ticket.nonce, input.proof)) {
    return { ok: false, status: 401, message: "auth rejected" };
  }

  return {
    ok: true,
    status: 200,
    message: "authenticated",
    flag: CTF_FLAG,
  };
}
