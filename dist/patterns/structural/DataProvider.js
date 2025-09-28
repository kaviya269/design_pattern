"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleProvider = void 0;
class SimpleProvider {
    async fetch(key) {
        // simulate I/O
        await new Promise(r => setTimeout(r, 50));
        return `value-for-${key}-${Date.now()}`;
    }
}
exports.SimpleProvider = SimpleProvider;
