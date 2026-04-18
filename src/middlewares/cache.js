const store = new Map();

const TTL = 30 * 1000

export function getFromCache(key){
    const entry = store.get(key);

    if(!entry) return null;
     
    const IsExpired = Date.now() - entry.time > TTL;
    if(IsExpired){
        store.delete(key);
        return null
    }


    return entry
}

export function saveToCache(key, data){
    store.set(key,{
        ...data,
        time: Date.now()
    })
}
