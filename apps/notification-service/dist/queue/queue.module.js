"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const config_1 = require("@nestjs/config");
const notification_processor_1 = require("./processors/notification.processor");
const content_template_module_1 = require("../content-template/content-template.module");
let QueueModule = class QueueModule {
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueueAsync({
                name: 'notification',
                useFactory: (config) => ({
                    redis: config.get('redis.url') || 'redis://localhost:6382',
                    defaultJobOptions: {
                        attempts: 3,
                        backoff: { type: 'exponential', delay: 1000 },
                        removeOnComplete: true,
                    },
                    limiter: { max: 10, duration: 1000 },
                }),
                inject: [config_1.ConfigService],
            }),
            content_template_module_1.ContentTemplateModule,
        ],
        providers: [notification_processor_1.NotificationProcessor],
        exports: [bull_1.BullModule],
    })
], QueueModule);
//# sourceMappingURL=queue.module.js.map