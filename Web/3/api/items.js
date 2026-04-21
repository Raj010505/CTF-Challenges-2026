module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    items: [
      {
        sku: "flag-vault",
        name: "Vault Access Token",
        price: 1500,
        currency: "INR",
        quantity: 1
      }
    ]
  });
};
