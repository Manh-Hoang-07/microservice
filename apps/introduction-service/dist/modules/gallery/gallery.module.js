"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryModule = void 0;
const common_1 = require("@nestjs/common");
const gallery_controller_1 = require("./admin/controllers/gallery.controller");
const gallery_service_1 = require("./admin/services/gallery.service");
const gallery_controller_2 = require("./public/controllers/gallery.controller");
const gallery_service_2 = require("./public/services/gallery.service");
let GalleryModule = class GalleryModule {
};
exports.GalleryModule = GalleryModule;
exports.GalleryModule = GalleryModule = __decorate([
    (0, common_1.Module)({
        controllers: [gallery_controller_1.AdminGalleryController, gallery_controller_2.PublicGalleryController],
        providers: [gallery_service_1.AdminGalleryService, gallery_service_2.PublicGalleryService],
        exports: [gallery_service_2.PublicGalleryService],
    })
], GalleryModule);
//# sourceMappingURL=gallery.module.js.map