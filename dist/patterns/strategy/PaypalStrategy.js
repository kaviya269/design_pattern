"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalStrategy = void 0;
class PaypalStrategy {
    async pay(amount) {
        if (amount <= 0)
            throw new Error('Invalid amount');
        // simulated immediate success
        return Promise.resolve(true);
    }
}
exports.PaypalStrategy = PaypalStrategy;
