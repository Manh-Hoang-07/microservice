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
exports.UserCommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const comments_service_1 = require("../services/comments.service");
const create_comment_dto_1 = require("../dtos/create-comment.dto");
let UserCommentController = class UserCommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async create(req, dto) {
        const userId = BigInt(req.user.sub);
        return this.commentService.create(userId, dto);
    }
    async update(req, id, body) {
        const userId = BigInt(req.user.sub);
        return this.commentService.update(userId, BigInt(id), body.content);
    }
    async delete(req, id) {
        const userId = BigInt(req.user.sub);
        return this.commentService.delete(userId, BigInt(id));
    }
};
exports.UserCommentController = UserCommentController;
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], UserCommentController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserCommentController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserCommentController.prototype, "delete", null);
exports.UserCommentController = UserCommentController = __decorate([
    (0, swagger_1.ApiTags)('User Comments'),
    (0, common_1.Controller)('user/comments'),
    __metadata("design:paramtypes", [comments_service_1.UserCommentService])
], UserCommentController);
//# sourceMappingURL=comments.controller.js.map