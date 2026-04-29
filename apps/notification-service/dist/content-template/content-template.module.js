"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const content_renderer_service_1 = require("./services/content-renderer.service");
const content_template_execution_service_1 = require("./services/content-template-execution.service");
const content_template_controller_1 = require("./admin/controllers/content-template.controller");
const content_template_service_1 = require("./admin/services/content-template.service");
let ContentTemplateModule = class ContentTemplateModule {
};
exports.ContentTemplateModule = ContentTemplateModule;
exports.ContentTemplateModule = ContentTemplateModule = __decorate([
    (0, common_1.Module)({
        controllers: [content_template_controller_1.AdminContentTemplateController],
        providers: [
            content_renderer_service_1.ContentRendererService,
            content_template_execution_service_1.ContentTemplateExecutionService,
            content_template_service_1.AdminContentTemplateService,
        ],
        exports: [content_template_execution_service_1.ContentTemplateExecutionService],
    })
], ContentTemplateModule);
//# sourceMappingURL=content-template.module.js.map