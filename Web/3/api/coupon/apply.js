const { verifyCouponCode } = require("../_lib/coupon");

function readJsonBody(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (_err) {
      return {};
    }
  }

  return req.body;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const body = readJsonBody(req);
  const couponCode = body && typeof body.couponCode === "string"
    ? body.couponCode
    : "";

  const verification = await verifyCouponCode(couponCode);
  res.setHeader("Cache-Control", "no-store");

  if (!verification.valid) {
    res.status(200).json({
      ok: true,
      valid: false,
      discountPercent: 0
    });
    return;
  }

  res.status(200).json({
    ok: true,
    valid: true,
    discountPercent: verification.discountPercent
  });
};
