"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransientError = void 0;
class TransientError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TransientError';
    }
}
exports.TransientError = TransientError;
