import http from "http";
import { config } from "./config.js";
import { getCacheKey } from "./utils/cacheKey.js";
import { getFromCache, saveToCache } from "./middlewares/cache.js";

export function handleProxy(req, res) {
  const headers = { ...req.headers };

  delete headers.connection;
  delete headers["transfer-encoding"];

  headers.host = config.TARGET_HOST;

  const options = {
    hostname: config.TARGET_HOST,
    port: config.TARGET_PORT,
    method: req.method,
    path: req.url,
    headers,
  };

  console.log("Incoming:", req.method, req.url);

  const key = getCacheKey(req);

  if (req.method === "GET") {
    const cached = getFromCache(key);

    if (cached) {
      console.log("Cache HIT:", key);
      res.writeHead(cached.status, cached.headers);
      return res.end(cached.body);
    }
  }

  const proxyReq = http.request(options, (proxyRes) => {
    let bodyChunks = [];

    proxyRes.on("data", (chunk) => {
      bodyChunks.push(chunk);
    });

    proxyRes.on("end", () => {
      const body = Buffer.concat(bodyChunks);

      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      res.end(body);

      if (req.method === "GET" && proxyRes.statusCode === 200) {
        saveToCache(key, {
          status: proxyRes.statusCode,
          headers: proxyRes.headers,
          body,
        });
      }
    });
  });

  proxyReq.on("error", (err) => {
    console.error("Proxy error:", err.message);
    res.writeHead(500);
    res.end("Proxy error");
  });

  req.pipe(proxyReq);
}