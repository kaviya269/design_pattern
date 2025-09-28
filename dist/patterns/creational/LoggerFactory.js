"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = exports.FileLogger = exports.ConsoleLogger = void 0;
const Logger_1 = require("../../utils/Logger");
class ConsoleLogger {
    info(msg) { console.log('[INFO]', msg); }
    warn(msg) { console.warn('[WARN]', msg); }
    error(msg) { console.error('[ERROR]', msg); }
}
exports.ConsoleLogger = ConsoleLogger;
class FileLogger {
    constructor() {
        this.logger = new Logger_1.Logger('factory.log');
    }
    info(msg) { this.logger.info(msg); }
    warn(msg) { this.logger.warn(msg); }
    error(msg) { this.logger.error(msg); }
}
exports.FileLogger = FileLogger;
class LoggerFactory {
    static createLogger(type) {
        if (type === 'file')
            return new FileLogger();
        return new ConsoleLogger();
    }
}
exports.LoggerFactory = LoggerFactory;
