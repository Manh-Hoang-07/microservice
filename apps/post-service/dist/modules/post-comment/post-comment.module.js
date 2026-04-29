"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentModule = void 0;
const common_1 = require("@nestjs/common");
const post_comment_controller_1 = require("./admin/controllers/post-comment.controller");
const post_comment_service_1 = require("./admin/services/post-comment.service");
const post_comment_controller_2 = require("./public/controllers/post-comment.controller");
const post_comment_service_2 = require("./public/services/post-comment.service");
const post_comment_controller_3 = require("./user/controllers/post-comment.controller");
const post_comment_service_3 = require("./user/services/post-comment.service");
let PostCommentModule = class PostCommentModule {
};
exports.PostCommentModule = PostCommentModule;
exports.PostCommentModule = PostCommentModule = __decorate([
    (0, common_1.Module)({
        controllers: [post_comment_controller_1.AdminPostCommentController, post_comment_controller_2.PublicPostCommentController, post_comment_controller_3.UserPostCommentController],
        providers: [post_comment_service_1.AdminPostCommentService, post_comment_service_2.PublicPostCommentService, post_comment_service_3.UserPostCommentService],
    })
], PostCommentModule);
//# sourceMappingURL=post-comment.module.js.map