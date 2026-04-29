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
exports.AdminBannerLocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const banner_location_service_1 = require("../services/banner-location.service");
const create_banner_location_dto_1 = require("../dtos/create-banner-location.dto");
const update_banner_location_dto_1 = require("../dtos/update-banner-location.dto");
let AdminBannerLocationController = class AdminBannerLocationController {
    constructor(bannerLocationService) {
        this.bannerLocationService = bannerLocationService;
    }
    async getList(query) {
        return this.bannerLocationService.getList(query);
    }
    async getOne(id) {
        return this.bannerLocationService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.bannerLocationService.create(dto);
    }
    async update(id, dto) {
        return this.bannerLocationService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.bannerLocationService.delete(BigInt(id));
    }
    async changeStatus(id, status) {
        return this.bannerLocationService.changeStatus(BigInt(id), status);
    }
};
exports.AdminBannerLocationController = AdminBannerLocationController;
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminBannerLocationController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminBannerLocationController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_location_dto_1.CreateBannerLocationDto]),
    __metadata("design:returntype", Promise)
], AdminBannerLocationController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_banner_location_dto_1.UpdateBannerLocationDto]),
    __metadata("design:returntype", Promise)
], AdminBannerLocationController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminBannerLocationController.prototype, "delete", null);
__decorate([
    (0, common_2.Permission)('marketing.manage'),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminBannerLocationController.prototype, "changeStatus", null);
exports.AdminBannerLocationController = AdminBannerLocationController = __decorate([
    (0, swagger_1.ApiTags)('Admin Banner Locations'),
    (0, common_1.Controller)('admin/banner-locations'),
    __metadata("design:paramtypes", [banner_location_service_1.AdminBannerLocationService])
], AdminBannerLocationController);
//# sourceMappingURL=banner-location.controller.js.map