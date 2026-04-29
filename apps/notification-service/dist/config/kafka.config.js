"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('kafka', () => ({
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9093').split(','),
    groupId: process.env.KAFKA_GROUP_ID || 'notification-service',
}));
//# sourceMappingURL=kafka.config.js.map