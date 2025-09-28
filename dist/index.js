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
const readline = __importStar(require("readline"));
const EventBus_1 = require("./patterns/observer/EventBus");
const Logger_1 = require("./utils/Logger");
const PaymentProcessor_1 = require("./patterns/strategy/PaymentProcessor");
const StripeStrategy_1 = require("./patterns/strategy/StripeStrategy");
const PaypalStrategy_1 = require("./patterns/strategy/PaypalStrategy");
const LoggerFactory_1 = require("./patterns/creational/LoggerFactory");
const ReportBuilder_1 = require("./patterns/creational/ReportBuilder");
const WeatherAdapter_1 = require("./patterns/structural/WeatherAdapter");
const DataProvider_1 = require("./patterns/structural/DataProvider");
const CachingDecorator_1 = require("./patterns/structural/CachingDecorator");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const bus = new EventBus_1.EventBus();
bus.subscribe('log', (p) => {
    Logger_1.logger.info('EventBus log: ' + JSON.stringify(p));
});
// Register a periodic health event (no while(true) usage)
setInterval(() => {
    bus.publish('log', { healthy: true, ts: new Date().toISOString() });
}, 30000); // every 30s
function showMenu() {
    console.log('\n--- Design Patterns Demo (TypeScript) ---');
    console.log('1) Observer: publish sample event');
    console.log('2) Strategy: simulate payment');
    console.log('3) Factory: create logger and log');
    console.log('4) Builder: build a report');
    console.log('5) Adapter: fetch weather via legacy API adapter');
    console.log('6) Decorator: fetch with caching provider');
    console.log('help) show menu');
    console.log('exit) quit');
    rl.prompt();
}
rl.on('line', async (line) => {
    const input = (line || '').trim();
    try {
        if (!input) {
            rl.prompt();
            return;
        }
        if (input === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }
        if (input === 'help') {
            showMenu();
            return;
        }
        switch (input) {
            case '1': {
                bus.publish('log', { event: 'sample', payload: Math.random() });
                console.log('Published sample event.');
                break;
            }
            case '2': {
                // choose strategy based on a simple heuristic
                const amt = 10;
                const proc = new PaymentProcessor_1.PaymentProcessor(Math.random() > 0.5 ? new StripeStrategy_1.StripeStrategy() : new PaypalStrategy_1.PaypalStrategy());
                const ok = await proc.checkout(amt);
                console.log('Payment result:', ok);
                break;
            }
            case '3': {
                const l = LoggerFactory_1.LoggerFactory.createLogger(Math.random() > 0.5 ? 'console' : 'file');
                l.info('Factory-created logger says hi.');
                break;
            }
            case '4': {
                const r = new ReportBuilder_1.ReportBuilder().setTitle('Monthly').setContent('All good').setAuthor('CLI Demo').build();
                console.log('Built report:', r);
                break;
            }
            case '5': {
                const wa = new WeatherAdapter_1.WeatherAdapter();
                const w = await wa.fetch('Mumbai');
                console.log('Weather adapted:', w);
                break;
            }
            case '6': {
                const provider = new CachingDecorator_1.CachingDecorator(new DataProvider_1.SimpleProvider(), 5000);
                const v1 = await provider.fetch('key1');
                console.log('First fetch:', v1);
                const v2 = await provider.fetch('key1');
                console.log('Second fetch (should be cached):', v2);
                break;
            }
            default:
                console.log('Unknown command. Type "help" to show menu.');
        }
    }
    catch (err) {
        Logger_1.logger.error('Unhandled error in CLI: ' + ((err === null || err === void 0 ? void 0 : err.message) || err));
        console.error(err);
    }
    finally {
        rl.prompt();
    }
});
rl.on('close', () => {
    console.log('CLI closed.');
    process.exit(0);
});
showMenu();
