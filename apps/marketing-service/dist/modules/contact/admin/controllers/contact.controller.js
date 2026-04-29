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
exports.AdminContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const contact_service_1 = require("../services/contact.service");
let AdminContactController = class AdminContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async getList(query) {
        return this.contactService.getList(query);
    }
    async getOne(id) {
        return this.contactService.getOne(BigInt(id));
    }
    async reply(id, reply, req) {
        const userId = BigInt(req.user?.sub || req.user?.id || 0);
        return this.contactService.reply(BigInt(id), reply, userId);
    }
    async markAsRead(id) {
        return this.contactService.markAsRead(BigInt(id));
    }
    async closeContact(id) {
        return this.contactService.closeContact(BigInt(id));
    }
};
exports.AdminContactController = AdminContactController;
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminContactController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminContactController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Patch)(':id/reply'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reply')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminContactController.prototype, "reply", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Patch)(':id/read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminContactController.prototype, "markAsRead", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Patch)(':id/close'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminContactController.prototype, "closeContact", null);
exports.AdminContactController = AdminContactController = __decorate([
    (0, swagger_1.ApiTags)('Admin Contacts'),
    (0, common_1.Controller)('admin/contacts'),
    __metadata("design:paramtypes", [contact_service_1.AdminContactService])
], AdminContactController);
//# sourceMappingURL=contact.controller.js.map