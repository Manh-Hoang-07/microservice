"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_controller_1 = require("./admin/controllers/post.controller");
const post_service_1 = require("./admin/services/post.service");
const post_controller_2 = require("./public/controllers/post.controller");
const post_service_2 = require("./public/services/post.service");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        controllers: [post_controller_1.AdminPostController, post_controller_2.PublicPostController],
        providers: [post_service_1.AdminPostService, post_service_2.PublicPostService],
        exports: [post_service_2.PublicPostService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map