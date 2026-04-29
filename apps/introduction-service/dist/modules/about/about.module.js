"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutModule = void 0;
const common_1 = require("@nestjs/common");
const about_controller_1 = require("./admin/controllers/about.controller");
const about_service_1 = require("./admin/services/about.service");
const about_controller_2 = require("./public/controllers/about.controller");
const about_service_2 = require("./public/services/about.service");
let AboutModule = class AboutModule {
};
exports.AboutModule = AboutModule;
exports.AboutModule = AboutModule = __decorate([
    (0, common_1.Module)({
        controllers: [about_controller_1.AdminAboutController, about_controller_2.PublicAboutController],
        providers: [about_service_1.AdminAboutService, about_service_2.PublicAboutService],
        exports: [about_service_2.PublicAboutService],
    })
], AboutModule);
//# sourceMappingURL=about.module.js.map