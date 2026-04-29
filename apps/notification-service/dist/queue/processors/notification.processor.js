"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const content_template_execution_service_1 = require("../../content-template/services/content-template-execution.service");
let NotificationProcessor = NotificationProcessor_1 = class NotificationProcessor {
    constructor(templateService) {
        this.templateService = templateService;
        this.logger = new common_1.Logger(NotificationProcessor_1.name);
    }
    async handleSendEmail(job) {
        const { templateCode, options } = job.data;
        this.logger.log(`Processing email job: ${templateCode} → ${options.to}`);
        try {
            await this.templateService.execute(templateCode, options);
            this.logger.log(`Email sent: ${templateCode} → ${options.to}`);
        }
        catch (err) {
            this.logger.error(`Failed email job: ${templateCode} → ${options.to}`, err);
            throw err;
        }
    }
};
exports.NotificationProcessor = NotificationProcessor;
__decorate([
    (0, bull_1.Process)({ name: 'send_email_template', concurrency: 5 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationProcessor.prototype, "handleSendEmail", null);
exports.NotificationProcessor = NotificationProcessor = NotificationProcessor_1 = __decorate([
    (0, bull_1.Processor)('notification'),
    __metadata("design:paramtypes", [content_template_execution_service_1.ContentTemplateExecutionService])
], NotificationProcessor);
//# sourceMappingURL=notification.processor.js.map