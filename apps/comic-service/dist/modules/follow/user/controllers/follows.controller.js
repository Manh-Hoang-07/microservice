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
exports.UserFollowController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const follows_service_1 = require("../services/follows.service");
let UserFollowController = class UserFollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async getList(req, query) {
        const userId = BigInt(req.user.sub);
        return this.followService.getList(userId, query);
    }
    async follow(req, id) {
        const userId = BigInt(req.user.sub);
        return this.followService.follow(userId, BigInt(id));
    }
    async unfollow(req, id) {
        const userId = BigInt(req.user.sub);
        return this.followService.unfollow(userId, BigInt(id));
    }
};
exports.UserFollowController = UserFollowController;
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Get)('follows'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserFollowController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Post)('comics/:id/follow'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserFollowController.prototype, "follow", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Delete)('comics/:id/follow'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserFollowController.prototype, "unfollow", null);
exports.UserFollowController = UserFollowController = __decorate([
    (0, swagger_1.ApiTags)('User Follows'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [follows_service_1.UserFollowService])
], UserFollowController);
//# sourceMappingURL=follows.controller.js.map