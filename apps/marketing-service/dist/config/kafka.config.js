"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('kafka', () => ({
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9093').split(','),
    enabled: process.env.EVENT_DRIVER === 'kafka',
}));
//# sourceMappingURL=kafka.config.js.map