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
exports.AdminNotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const notification_service_1 = require("../services/notification.service");
let AdminNotificationController = class AdminNotificationController {
    constructor(notifService) {
        this.notifService = notifService;
    }
    async getList(query) {
        return this.notifService.getList(query);
    }
    async getOne(id) {
        return this.notifService.getOne(BigInt(id));
    }
    async create(body) {
        return this.notifService.create(body);
    }
    async update(id, body) {
        return this.notifService.update(BigInt(id), body);
    }
    async delete(id) {
        return this.notifService.delete(BigInt(id));
    }
};
exports.AdminNotificationController = AdminNotificationController;
__decorate([
    (0, common_2.Permission)('notification.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminNotificationController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('notification.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminNotificationController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('notification.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminNotificationController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('notification.manage'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminNotificationController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('notification.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminNotificationController.prototype, "delete", null);
exports.AdminNotificationController = AdminNotificationController = __decorate([
    (0, swagger_1.ApiTags)('Admin Notifications'),
    (0, common_1.Controller)('admin/notifications'),
    __metadata("design:paramtypes", [notification_service_1.AdminNotificationService])
], AdminNotificationController);
//# sourceMappingURL=notification.controller.js.map