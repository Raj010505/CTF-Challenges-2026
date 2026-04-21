const fs = require("fs");
const path = require("path");
const http = require("http");

const itemsHandler = require("./api/items");
const walletHandler = require("./api/wallet");
const couponApplyHandler = require("./api/coupon/apply");
const checkoutHandler = require("./api/checkout");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function parseJsonBody(req) {
  return new Promise((resolve) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        raw = "";
        resolve({});
      }
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (_err) {
        resolve({});
      }
    });

    req.on("error", () => resolve({}));
  });
}

function createExpressLike(req, res, bodyObj) {
  return {
    method: req.method,
    headers: req.headers,
    body: bodyObj
  };
}

function createExpressLikeRes(res) {
  return {
    status(code) {
      res.statusCode = code;
      return this;
    },
    setHeader(name, value) {
      res.setHeader(name, value);
      return this;
    },
    json(payload) {
      if (!res.getHeader("Content-Type")) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
      }
      res.end(JSON.stringify(payload));
    }
  };
}

function serveIndex(res) {
  const htmlPath = path.join(ROOT, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(html);
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/" && req.method === "GET") {
      serveIndex(res);
      return;
    }

    if (req.url === "/api/items") {
      const fauxReq = createExpressLike(req, res, {});
      const fauxRes = createExpressLikeRes(res);
      await itemsHandler(fauxReq, fauxRes);
      return;
    }

    if (req.url === "/api/wallet") {
      const fauxReq = createExpressLike(req, res, {});
      const fauxRes = createExpressLikeRes(res);
      await walletHandler(fauxReq, fauxRes);
      return;
    }

    if (req.url === "/api/coupon/apply") {
      const body = req.method === "POST" ? await parseJsonBody(req) : {};
      const fauxReq = createExpressLike(req, res, body);
      const fauxRes = createExpressLikeRes(res);
      await couponApplyHandler(fauxReq, fauxRes);
      return;
    }

    if (req.url === "/api/checkout") {
      const body = req.method === "POST" ? await parseJsonBody(req) : {};
      const fauxReq = createExpressLike(req, res, body);
      const fauxRes = createExpressLikeRes(res);
      await checkoutHandler(fauxReq, fauxRes);
      return;
    }

    sendJson(res, 404, { ok: false, error: "Not found" });
  } catch (err) {
    sendJson(res, 500, { ok: false, error: "Server error", detail: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`Local challenge server running on http://localhost:${PORT}`);
});
