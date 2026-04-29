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
exports.PublicPostCommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const post_comment_service_1 = require("../services/post-comment.service");
let PublicPostCommentController = class PublicPostCommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async getList(query) {
        return this.commentService.getList(query);
    }
};
exports.PublicPostCommentController = PublicPostCommentController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicPostCommentController.prototype, "getList", null);
exports.PublicPostCommentController = PublicPostCommentController = __decorate([
    (0, swagger_1.ApiTags)('Public Post Comments'),
    (0, common_1.Controller)('public/post-comments'),
    __metadata("design:paramtypes", [post_comment_service_1.PublicPostCommentService])
], PublicPostCommentController);
//# sourceMappingURL=post-comment.controller.js.map