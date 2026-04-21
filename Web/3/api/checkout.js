const { verifyCouponCode } = require("./_lib/coupon");

const CART_ITEM = {
  sku: "flag-vault",
  name: "Vault Access Token",
  unitPrice: 1500,
  quantity: 1,
  currency: "INR"
};

const WALLET_BALANCE = 0;

function getFlag() {
  return process.env.FLAG || "CH4KR4X2{P0D5_n3th3r_r00t_4cc3ss}";
}

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
  const subtotal = CART_ITEM.unitPrice * CART_ITEM.quantity;
  const discountPercent = verification.valid ? verification.discountPercent : 0;
  const discountedAmount = Math.floor((subtotal * discountPercent) / 100);
  const finalAmount = Math.max(0, subtotal - discountedAmount);

  res.setHeader("Cache-Control", "no-store");

  if (WALLET_BALANCE < finalAmount) {
    res.status(200).json({
      ok: false,
      purchased: false,
      walletBalance: WALLET_BALANCE,
      subtotal,
      discountPercent,
      finalAmount,
      message: "Insufficient wallet balance"
    });
    return;
  }

  res.status(200).json({
    ok: true,
    purchased: true,
    walletBalance: WALLET_BALANCE,
    subtotal,
    discountPercent,
    finalAmount,
    product: CART_ITEM.name,
    flag: getFlag()
  });
};
