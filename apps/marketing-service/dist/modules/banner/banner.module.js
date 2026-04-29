"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModule = void 0;
const common_1 = require("@nestjs/common");
const banner_controller_1 = require("./admin/controllers/banner.controller");
const banner_service_1 = require("./admin/services/banner.service");
const banner_controller_2 = require("./public/controllers/banner.controller");
const banner_service_2 = require("./public/services/banner.service");
let BannerModule = class BannerModule {
};
exports.BannerModule = BannerModule;
exports.BannerModule = BannerModule = __decorate([
    (0, common_1.Module)({
        controllers: [banner_controller_1.AdminBannerController, banner_controller_2.PublicBannerController],
        providers: [banner_service_1.AdminBannerService, banner_service_2.PublicBannerService],
        exports: [banner_service_2.PublicBannerService],
    })
], BannerModule);
//# sourceMappingURL=banner.module.js.map