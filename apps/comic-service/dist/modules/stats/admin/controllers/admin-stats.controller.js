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
exports.AdminStatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const admin_stats_service_1 = require("../services/admin-stats.service");
let AdminStatsController = class AdminStatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getDashboard() {
        return this.statsService.getDashboard();
    }
    async getTopComics(query) {
        return this.statsService.getTopComics(query);
    }
};
exports.AdminStatsController = AdminStatsController;
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminStatsController.prototype, "getDashboard", null);
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Get)('top-comics'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminStatsController.prototype, "getTopComics", null);
exports.AdminStatsController = AdminStatsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Stats'),
    (0, common_1.Controller)('admin/stats'),
    __metadata("design:paramtypes", [admin_stats_service_1.AdminStatsService])
], AdminStatsController);
//# sourceMappingURL=admin-stats.controller.js.map