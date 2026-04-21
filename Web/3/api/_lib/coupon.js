const crypto = require("crypto");

const ALLOWED_HEX = "0123456789abcdef";
const SIGNATURE_LENGTH = 8;
const SIGNATURE_DELAY_MS = 28;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSecret() {
  return process.env.COUPON_SECRET || "n3th3r-cart-signing-key";
}

function signPayload(payload) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex")
    .slice(0, SIGNATURE_LENGTH);
}

function isHex(value) {
  if (typeof value !== "string" || value.length !== SIGNATURE_LENGTH) {
    return false;
  }

  const normalized = value.toLowerCase();
  for (let i = 0; i < normalized.length; i += 1) {
    if (!ALLOWED_HEX.includes(normalized[i])) {
      return false;
    }
  }

  return true;
}

// Intentionally vulnerable timing comparison for CTF use.
async function insecureVerifySignature(payload, providedSignature) {
  const expectedSignature = signPayload(payload);
  const normalizedProvided = (providedSignature || "").toLowerCase();

  if (!isHex(normalizedProvided)) {
    return false;
  }

  for (let i = 0; i < SIGNATURE_LENGTH; i += 1) {
    if (expectedSignature[i] !== normalizedProvided[i]) {
      return false;
    }

    await sleep(SIGNATURE_DELAY_MS);
  }

  return true;
}

async function verifyCouponCode(rawCode) {
  if (typeof rawCode !== "string") {
    return { valid: false, discountPercent: 0 };
  }

  const code = rawCode.trim();
  const parts = code.split(".");
  if (parts.length !== 4) {
    return { valid: false, discountPercent: 0 };
  }

  const [prefix, discountRaw, nonce, signature] = parts;
  if (prefix !== "CART") {
    return { valid: false, discountPercent: 0 };
  }

  const discount = Number.parseInt(discountRaw, 10);
  if (!Number.isInteger(discount) || discount < 1 || discount > 100) {
    return { valid: false, discountPercent: 0 };
  }

  if (!nonce || nonce.length > 64) {
    return { valid: false, discountPercent: 0 };
  }

  const payload = `CART.${discount}.${nonce}`;
  const signatureMatches = await insecureVerifySignature(payload, signature);

  return {
    valid: signatureMatches,
    discountPercent: signatureMatches ? discount : 0
  };
}

module.exports = {
  verifyCouponCode,
  signPayload
};
