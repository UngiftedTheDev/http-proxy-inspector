import http from "http"
import { config } from "./config.js"
import { hostname } from "os"


export function handleProxy(req, res){
    const options = {
        hostname: config.TARGET_HOST,
        port: config.TARGET_PORT,
        path: req.url,
        method: req.method,
        headers: req.headers
    }

    const proxyReq = (options, proxyRes )=> {
        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res)
    }

    //error handling
    proxyReq.on("error", (error)=> {
        console.error("Proxy error: ", error.message);
        res.writeHead(500)
        res.end("Proxy error")
    })

    res.pipe(proxyReq);

}