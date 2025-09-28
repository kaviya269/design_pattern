"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingDecorator = void 0;
class CachingDecorator {
    constructor(provider, ttlMs = 5000) {
        this.provider = provider;
        this.ttlMs = ttlMs;
        this.cache = new Map();
    }
    async fetch(key) {
        if (!key)
            throw new Error('key required');
        const now = Date.now();
        const cached = this.cache.get(key);
        if (cached && (now - cached.ts) < this.ttlMs) {
            return cached.value;
        }
        const val = await this.provider.fetch(key);
        this.cache.set(key, { value: val, ts: now });
        return val;
    }
}
exports.CachingDecorator = CachingDecorator;
