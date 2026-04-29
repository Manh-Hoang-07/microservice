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
exports.AdminFaqController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const faq_service_1 = require("../services/faq.service");
const create_faq_dto_1 = require("../dtos/create-faq.dto");
const update_faq_dto_1 = require("../dtos/update-faq.dto");
let AdminFaqController = class AdminFaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async getList(query) {
        return this.faqService.getList(query);
    }
    async getOne(id) {
        return this.faqService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.faqService.create(dto);
    }
    async update(id, dto) {
        return this.faqService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.faqService.delete(BigInt(id));
    }
};
exports.AdminFaqController = AdminFaqController;
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_faq_dto_1.CreateFaqDto]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_faq_dto_1.UpdateFaqDto]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('introduction.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminFaqController.prototype, "delete", null);
exports.AdminFaqController = AdminFaqController = __decorate([
    (0, swagger_1.ApiTags)('Admin FAQs'),
    (0, common_1.Controller)('admin/faqs'),
    __metadata("design:paramtypes", [faq_service_1.AdminFaqService])
], AdminFaqController);
//# sourceMappingURL=faq.controller.js.map