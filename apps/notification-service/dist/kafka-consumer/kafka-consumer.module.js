"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerModule = void 0;
const common_1 = require("@nestjs/common");
const kafka_consumer_service_1 = require("./services/kafka-consumer.service");
const notification_module_1 = require("../notification/notification.module");
const content_template_module_1 = require("../content-template/content-template.module");
const queue_module_1 = require("../queue/queue.module");
let KafkaConsumerModule = class KafkaConsumerModule {
};
exports.KafkaConsumerModule = KafkaConsumerModule;
exports.KafkaConsumerModule = KafkaConsumerModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule, content_template_module_1.ContentTemplateModule, queue_module_1.QueueModule],
        providers: [kafka_consumer_service_1.KafkaConsumerService],
    })
], KafkaConsumerModule);
//# sourceMappingURL=kafka-consumer.module.js.map