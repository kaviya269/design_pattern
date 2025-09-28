"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProcessor = void 0;
class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    async checkout(amount) {
        if (!this.strategy)
            throw new Error('No payment strategy provided');
        return this.strategy.pay(amount);
    }
}
exports.PaymentProcessor = PaymentProcessor;
