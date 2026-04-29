"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const comments_controller_1 = require("./admin/controllers/comments.controller");
const comments_service_1 = require("./admin/services/comments.service");
const comments_controller_2 = require("./public/controllers/comments.controller");
const comments_service_2 = require("./public/services/comments.service");
const comments_controller_3 = require("./user/controllers/comments.controller");
const comments_service_3 = require("./user/services/comments.service");
let CommentModule = class CommentModule {
};
exports.CommentModule = CommentModule;
exports.CommentModule = CommentModule = __decorate([
    (0, common_1.Module)({
        controllers: [comments_controller_1.AdminCommentController, comments_controller_2.PublicCommentController, comments_controller_3.UserCommentController],
        providers: [comments_service_1.AdminCommentService, comments_service_2.PublicCommentService, comments_service_3.UserCommentService],
    })
], CommentModule);
//# sourceMappingURL=comment.module.js.map