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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicPostCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const post_category_service_1 = require("../services/post-category.service");
let PublicPostCategoryController = class PublicPostCategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getAll() {
        return this.categoryService.getAll();
    }
};
exports.PublicPostCategoryController = PublicPostCategoryController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicPostCategoryController.prototype, "getAll", null);
exports.PublicPostCategoryController = PublicPostCategoryController = __decorate([
    (0, swagger_1.ApiTags)('Public Post Categories'),
    (0, common_1.Controller)('public/post-categories'),
    __metadata("design:paramtypes", [post_category_service_1.PublicPostCategoryService])
], PublicPostCategoryController);
//# sourceMappingURL=post-category.controller.js.map