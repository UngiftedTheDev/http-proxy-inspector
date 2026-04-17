import { generateId } from "../utils/id.js";

export const attachLogger = (req, res)=> {
    const id = generateId;
    const startTime = Date.now()

    //attach
    req.id = id;
    console.log(`[${id}] → ${req.method} ${req.url} `);

    res.on("feinish", ()=> {
        const duration = Date.now() - startTime;

        console.log(`[${id}] ← ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    })

}