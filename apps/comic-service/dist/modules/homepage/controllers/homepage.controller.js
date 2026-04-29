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
exports.HomepageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const homepage_service_1 = require("../services/homepage.service");
let HomepageController = class HomepageController {
    constructor(homepageService) {
        this.homepageService = homepageService;
    }
    async getTopViewed(limit) {
        return this.homepageService.getTopViewed(Number(limit) || 12);
    }
    async getPopular(limit) {
        return this.homepageService.getPopular(Number(limit) || 12);
    }
    async getNewest(limit) {
        return this.homepageService.getNewest(Number(limit) || 12);
    }
    async getRecentlyUpdated(limit) {
        return this.homepageService.getRecentlyUpdated(Number(limit) || 12);
    }
    async getCategories() {
        return this.homepageService.getCategories();
    }
};
exports.HomepageController = HomepageController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)('top-viewed'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomepageController.prototype, "getTopViewed", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)('popular'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomepageController.prototype, "getPopular", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)('newest'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomepageController.prototype, "getNewest", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)('recently-updated'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomepageController.prototype, "getRecentlyUpdated", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomepageController.prototype, "getCategories", null);
exports.HomepageController = HomepageController = __decorate([
    (0, swagger_1.ApiTags)('Homepage'),
    (0, common_1.Controller)('public/homepage'),
    __metadata("design:paramtypes", [homepage_service_1.HomepageService])
], HomepageController);
//# sourceMappingURL=homepage.controller.js.map