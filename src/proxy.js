import http from "http"
import { config } from "./config.js"

export function handleProxy(req, res){
    const headers = { ...req.headers };

    delete headers.connection;
    delete headers["transfer-encoding"];

headers.host = config.TARGET_HOST; // fix so client request doesn't go too server

const options = {
  hostname: config.TARGET_HOST,
  port: config.TARGET_PORT,
  method: req.method,
  path: req.url,
  headers,
};

console.log("Incoming:", req.method, req.url);

    const proxyReq = http.request(options, (proxyRes)=> {
        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res)
        console.log("Upstream status:", proxyRes.statusCode);
    })

    proxyReq.on("error", (err)=> {
        console.error("Proxy error: ", err.message)
        res.writeHead(500)
        res.end("Proxy error")
    })
    
    

    req.pipe(proxyReq)


}