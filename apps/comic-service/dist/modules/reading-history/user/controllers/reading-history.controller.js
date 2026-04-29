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
exports.UserReadingHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const reading_history_service_1 = require("../services/reading-history.service");
let UserReadingHistoryController = class UserReadingHistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    async getList(req, query) {
        const userId = BigInt(req.user.sub);
        return this.historyService.getList(userId, query);
    }
    async upsert(req, body) {
        const userId = BigInt(req.user.sub);
        return this.historyService.upsert(userId, BigInt(body.comic_id), BigInt(body.chapter_id));
    }
    async clear(req, comicId) {
        const userId = BigInt(req.user.sub);
        return this.historyService.clear(userId, BigInt(comicId));
    }
};
exports.UserReadingHistoryController = UserReadingHistoryController;
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserReadingHistoryController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserReadingHistoryController.prototype, "upsert", null);
__decorate([
    (0, common_2.Permission)('user'),
    (0, common_1.Delete)(':comicId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('comicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserReadingHistoryController.prototype, "clear", null);
exports.UserReadingHistoryController = UserReadingHistoryController = __decorate([
    (0, swagger_1.ApiTags)('User Reading History'),
    (0, common_1.Controller)('user/reading-history'),
    __metadata("design:paramtypes", [reading_history_service_1.UserReadingHistoryService])
], UserReadingHistoryController);
//# sourceMappingURL=reading-history.controller.js.map