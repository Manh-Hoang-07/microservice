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
exports.AdminPostCommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const post_comment_service_1 = require("../services/post-comment.service");
let AdminPostCommentController = class AdminPostCommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async getList(query) {
        return this.commentService.getList(query);
    }
    async updateStatus(id, body) {
        return this.commentService.updateStatus(BigInt(id), body.status);
    }
};
exports.AdminPostCommentController = AdminPostCommentController;
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPostCommentController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminPostCommentController.prototype, "updateStatus", null);
exports.AdminPostCommentController = AdminPostCommentController = __decorate([
    (0, swagger_1.ApiTags)('Admin Post Comments'),
    (0, common_1.Controller)('admin/post-comments'),
    __metadata("design:paramtypes", [post_comment_service_1.AdminPostCommentService])
], AdminPostCommentController);
//# sourceMappingURL=post-comment.controller.js.map