"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Logger {
    constructor(filename = 'app.log') {
        const logsDir = path.resolve(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir))
            fs.mkdirSync(logsDir);
        this.logFile = path.join(logsDir, filename);
    }
    info(message) {
        this.write('INFO', message);
    }
    warn(message) {
        this.write('WARN', message);
    }
    error(message) {
        this.write('ERROR', message);
    }
    write(level, message) {
        const ts = new Date().toISOString();
        const line = `[${ts}] [${level}] ${message}\n`;
        // defensive: don't block, append asynchronously
        fs.appendFile(this.logFile, line, (err) => {
            if (err)
                console.error('Failed to write log:', err);
        });
        console.log(line.trim());
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
