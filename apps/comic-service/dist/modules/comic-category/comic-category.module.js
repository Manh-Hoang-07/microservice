"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComicCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const comic_category_controller_1 = require("./admin/controllers/comic-category.controller");
const comic_category_service_1 = require("./admin/services/comic-category.service");
const comic_category_controller_2 = require("./public/controllers/comic-category.controller");
const comic_category_service_2 = require("./public/services/comic-category.service");
let ComicCategoryModule = class ComicCategoryModule {
};
exports.ComicCategoryModule = ComicCategoryModule;
exports.ComicCategoryModule = ComicCategoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [comic_category_controller_1.AdminCategoryController, comic_category_controller_2.PublicCategoryController],
        providers: [comic_category_service_1.AdminCategoryService, comic_category_service_2.PublicCategoryService],
    })
], ComicCategoryModule);
//# sourceMappingURL=comic-category.module.js.map