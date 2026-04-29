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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicFaqController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const faq_service_1 = require("../services/faq.service");
let PublicFaqController = class PublicFaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async getList(query) {
        return this.faqService.getList(query);
    }
    async getOne(id) {
        return this.faqService.getOne(BigInt(id));
    }
    async incrementViewCount(id) {
        return this.faqService.incrementViewCount(BigInt(id));
    }
    async incrementHelpfulCount(id) {
        return this.faqService.incrementHelpfulCount(BigInt(id));
    }
};
exports.PublicFaqController = PublicFaqController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicFaqController.prototype, "getList", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicFaqController.prototype, "getOne", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)(':id/view'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicFaqController.prototype, "incrementViewCount", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Post)(':id/helpful'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicFaqController.prototype, "incrementHelpfulCount", null);
exports.PublicFaqController = PublicFaqController = __decorate([
    (0, swagger_1.ApiTags)('Public FAQs'),
    (0, common_1.Controller)('public/faqs'),
    __metadata("design:paramtypes", [faq_service_1.PublicFaqService])
], PublicFaqController);
//# sourceMappingURL=faq.controller.js.map