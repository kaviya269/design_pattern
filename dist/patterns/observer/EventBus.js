"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.handlers = new Map();
    }
    subscribe(event, handler) {
        var _a;
        if (!event || typeof handler !== 'function')
            throw new Error('Invalid subscribe args');
        const set = (_a = this.handlers.get(event)) !== null && _a !== void 0 ? _a : new Set();
        set.add(handler);
        this.handlers.set(event, set);
        // return unsubscribe function
        return () => set.delete(handler);
    }
    publish(event, payload) {
        const set = this.handlers.get(event);
        if (!set)
            return;
        // defensive copy
        Array.from(set).forEach(h => {
            try {
                h(payload);
            }
            catch (e) {
                console.error('Event handler error', e);
            }
        });
    }
}
exports.EventBus = EventBus;
