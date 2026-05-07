const hopByHopHeaders = [
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade"
]

export function normalizeHeaders(headers, targetHost){
    const cleanHeaders = {...headers};

    for(const header of hopByHopHeaders){
        delete cleanHeaders[header]
    }
    cleanHeaders.host = targetHost

    cleanHeaders["x-proxy-server"] = "http-proxy-inspector";
    return cleanHeaders

}