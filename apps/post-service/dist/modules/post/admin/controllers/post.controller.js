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
exports.AdminPostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const post_service_1 = require("../services/post.service");
const create_post_dto_1 = require("../dtos/create-post.dto");
const update_post_dto_1 = require("../dtos/update-post.dto");
let AdminPostController = class AdminPostController {
    constructor(postService) {
        this.postService = postService;
    }
    async getList(query) {
        return this.postService.getList(query);
    }
    async getSimpleList(query) {
        return this.postService.getSimpleList(query);
    }
    async getOne(id) {
        return this.postService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.postService.create(dto);
    }
    async update(id, dto) {
        return this.postService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.postService.delete(BigInt(id));
    }
};
exports.AdminPostController = AdminPostController;
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPostController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Get)('simple'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPostController.prototype, "getSimpleList", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminPostController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], AdminPostController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], AdminPostController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminPostController.prototype, "delete", null);
exports.AdminPostController = AdminPostController = __decorate([
    (0, swagger_1.ApiTags)('Admin Posts'),
    (0, common_1.Controller)('admin/posts'),
    __metadata("design:paramtypes", [post_service_1.AdminPostService])
], AdminPostController);
//# sourceMappingURL=post.controller.js.map