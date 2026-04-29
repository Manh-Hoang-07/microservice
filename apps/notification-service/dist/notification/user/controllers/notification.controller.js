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
exports.UserNotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const notification_service_1 = require("../services/notification.service");
let UserNotificationController = class UserNotificationController {
    constructor(notifService) {
        this.notifService = notifService;
    }
    async getList(req, query) {
        const userId = BigInt(req.user.sub);
        return this.notifService.getList(userId, query);
    }
    async getUnreadCount(req) {
        const userId = BigInt(req.user.sub);
        return this.notifService.getUnreadCount(userId);
    }
    async getOne(req, id) {
        const userId = BigInt(req.user.sub);
        return this.notifService.getOne(userId, BigInt(id));
    }
    async markAsRead(req, id) {
        const userId = BigInt(req.user.sub);
        return this.notifService.markAsRead(userId, BigInt(id));
    }
    async markAllAsRead(req) {
        const userId = BigInt(req.user.sub);
        return this.notifService.markAllAsRead(userId);
    }
};
exports.UserNotificationController = UserNotificationController;
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Get)('unread/count'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Patch)(':id/read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Patch)('read-all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserNotificationController.prototype, "markAllAsRead", null);
exports.UserNotificationController = UserNotificationController = __decorate([
    (0, swagger_1.ApiTags)('User Notifications'),
    (0, common_1.Controller)('user/notifications'),
    __metadata("design:paramtypes", [notification_service_1.UserNotificationService])
], UserNotificationController);
//# sourceMappingURL=notification.controller.js.map