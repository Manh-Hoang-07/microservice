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
exports.AdminPostCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const post_category_service_1 = require("../services/post-category.service");
const create_post_category_dto_1 = require("../dtos/create-post-category.dto");
const update_post_category_dto_1 = require("../dtos/update-post-category.dto");
let AdminPostCategoryController = class AdminPostCategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getList(query) {
        return this.categoryService.getList(query);
    }
    async getOne(id) {
        return this.categoryService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.categoryService.create(dto);
    }
    async update(id, dto) {
        return this.categoryService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.categoryService.delete(BigInt(id));
    }
};
exports.AdminPostCategoryController = AdminPostCategoryController;
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPostCategoryController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminPostCategoryController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_category_dto_1.CreatePostCategoryDto]),
    __metadata("design:returntype", Promise)
], AdminPostCategoryController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_category_dto_1.UpdatePostCategoryDto]),
    __metadata("design:returntype", Promise)
], AdminPostCategoryController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('post.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminPostCategoryController.prototype, "delete", null);
exports.AdminPostCategoryController = AdminPostCategoryController = __decorate([
    (0, swagger_1.ApiTags)('Admin Post Categories'),
    (0, common_1.Controller)('admin/post-categories'),
    __metadata("design:paramtypes", [post_category_service_1.AdminPostCategoryService])
], AdminPostCategoryController);
//# sourceMappingURL=post-category.controller.js.map