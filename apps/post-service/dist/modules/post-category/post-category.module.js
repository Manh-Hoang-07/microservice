"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const post_category_controller_1 = require("./admin/controllers/post-category.controller");
const post_category_service_1 = require("./admin/services/post-category.service");
const post_category_controller_2 = require("./public/controllers/post-category.controller");
const post_category_service_2 = require("./public/services/post-category.service");
let PostCategoryModule = class PostCategoryModule {
};
exports.PostCategoryModule = PostCategoryModule;
exports.PostCategoryModule = PostCategoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [post_category_controller_1.AdminPostCategoryController, post_category_controller_2.PublicPostCategoryController],
        providers: [post_category_service_1.AdminPostCategoryService, post_category_service_2.PublicPostCategoryService],
    })
], PostCategoryModule);
//# sourceMappingURL=post-category.module.js.map