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
exports.PublicChapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const chapter_service_1 = require("../services/chapter.service");
let PublicChapterController = class PublicChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    async getOne(id) {
        return this.chapterService.getOne(BigInt(id));
    }
    async getPages(id) {
        return this.chapterService.getPages(BigInt(id));
    }
    async getNext(id) {
        return this.chapterService.getNext(BigInt(id));
    }
    async getPrev(id) {
        return this.chapterService.getPrev(BigInt(id));
    }
};
exports.PublicChapterController = PublicChapterController;
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicChapterController.prototype, "getOne", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(':id/pages'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicChapterController.prototype, "getPages", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(':id/next'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicChapterController.prototype, "getNext", null);
__decorate([
    (0, common_2.Public)(),
    (0, common_1.Get)(':id/prev'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicChapterController.prototype, "getPrev", null);
exports.PublicChapterController = PublicChapterController = __decorate([
    (0, swagger_1.ApiTags)('Public Chapters'),
    (0, common_1.Controller)('public/chapters'),
    __metadata("design:paramtypes", [chapter_service_1.PublicChapterService])
], PublicChapterController);
//# sourceMappingURL=chapter.controller.js.map