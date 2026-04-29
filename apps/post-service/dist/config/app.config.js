"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT || '3007', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    corsOrigins: process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
        : ['*'],
}));
//# sourceMappingURL=app.config.js.map