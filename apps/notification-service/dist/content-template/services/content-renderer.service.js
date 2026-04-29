"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRendererService = void 0;
const common_1 = require("@nestjs/common");
let ContentRendererService = class ContentRendererService {
    render(content, variables) {
        return content.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
            const parts = key.split('.');
            let value = variables;
            for (const part of parts) {
                if (value === null || value === undefined)
                    return match;
                value = value[part];
            }
            return value !== null && value !== undefined ? String(value) : match;
        });
    }
};
exports.ContentRendererService = ContentRendererService;
exports.ContentRendererService = ContentRendererService = __decorate([
    (0, common_1.Injectable)()
], ContentRendererService);
//# sourceMappingURL=content-renderer.service.js.map