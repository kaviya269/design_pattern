"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
const Logger_1 = require("./Logger");
async function retry(fn, attempts = 3, baseDelay = 200) {
    if (attempts < 1)
        throw new Error('attempts must be >= 1');
    let lastErr;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        }
        catch (err) {
            lastErr = err;
            const delay = baseDelay * Math.pow(2, i); // exponential backoff
            // Defensive: extract error message safely
            const msg = err instanceof Error ? err.message : JSON.stringify(err);
            Logger_1.logger.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms. Error: ${msg}`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw lastErr;
}
exports.retry = retry;
