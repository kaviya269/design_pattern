"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeStrategy = void 0;
const retry_1 = require("../../utils/retry");
const TransientError_1 = require("../../errors/TransientError");
class StripeStrategy {
    async pay(amount) {
        // simulate transient network operation with retries
        const result = await (0, retry_1.retry)(async () => {
            if (Math.random() < 0.4) {
                throw new TransientError_1.TransientError('Temporary stripe failure');
            }
            // business validation
            if (amount <= 0)
                throw new Error('Invalid amount');
            return true;
        }, 4, 150);
        return result;
    }
}
exports.StripeStrategy = StripeStrategy;
