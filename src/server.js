import http from "http"
import { config } from "./config.js"
import { handleProxy } from "./proxy.js"


const server = http.createServer((req, res)=> {
    handleProxy(req, res);
})

server.listen(config.PROXY_PORT, ()=> {
    console.log(`Proxy running on http://localhost: ${config.PROXY_PORT}`)
})