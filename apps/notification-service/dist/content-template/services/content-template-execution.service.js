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
var ContentTemplateExecutionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTemplateExecutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const content_renderer_service_1 = require("./content-renderer.service");
const mail_service_1 = require("../../mail/mail.service");
let ContentTemplateExecutionService = ContentTemplateExecutionService_1 = class ContentTemplateExecutionService {
    constructor(prisma, renderer, mail) {
        this.prisma = prisma;
        this.renderer = renderer;
        this.mail = mail;
        this.logger = new common_1.Logger(ContentTemplateExecutionService_1.name);
    }
    async execute(code, options) {
        const template = await this.prisma.contentTemplate.findFirst({
            where: { code, status: 'active', category: 'render' },
        });
        if (!template) {
            this.logger.warn(`Template not found or inactive: ${code}`);
            throw new common_1.NotFoundException(`Template not found: ${code}`);
        }
        if (!template.content) {
            this.logger.warn(`Template has no content: ${code}`);
            return;
        }
        const renderedContent = this.renderer.render(template.content, options.variables);
        const metadata = template.metadata;
        const subject = options.subject || metadata?.subject || template.name;
        if (template.type === 'email') {
            await this.mail.send({
                to: options.to,
                subject,
                html: renderedContent,
            });
        }
        else {
            this.logger.log(`Template type "${template.type}" not yet supported for dispatch`);
        }
    }
};
exports.ContentTemplateExecutionService = ContentTemplateExecutionService;
exports.ContentTemplateExecutionService = ContentTemplateExecutionService = ContentTemplateExecutionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        content_renderer_service_1.ContentRendererService,
        mail_service_1.MailService])
], ContentTemplateExecutionService);
//# sourceMappingURL=content-template-execution.service.js.map