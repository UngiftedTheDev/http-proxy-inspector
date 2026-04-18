export function getCacheKey(req){
    return `${req.method}:${req.url}`;
}