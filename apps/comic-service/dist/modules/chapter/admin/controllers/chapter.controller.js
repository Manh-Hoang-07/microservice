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
exports.AdminChapterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@package/common");
const chapter_service_1 = require("../services/chapter.service");
const create_chapter_dto_1 = require("../dtos/create-chapter.dto");
const update_chapter_dto_1 = require("../dtos/update-chapter.dto");
let AdminChapterController = class AdminChapterController {
    constructor(chapterService) {
        this.chapterService = chapterService;
    }
    async getList(query) {
        return this.chapterService.getList(query);
    }
    async getSimpleList(query) {
        return this.chapterService.getSimpleList(query);
    }
    async getOne(id) {
        return this.chapterService.getOne(BigInt(id));
    }
    async create(dto) {
        return this.chapterService.create(dto);
    }
    async update(id, dto) {
        return this.chapterService.update(BigInt(id), dto);
    }
    async delete(id) {
        return this.chapterService.delete(BigInt(id));
    }
};
exports.AdminChapterController = AdminChapterController;
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminChapterController.prototype, "getList", null);
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Get)('simple'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminChapterController.prototype, "getSimpleList", null);
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminChapterController.prototype, "getOne", null);
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chapter_dto_1.CreateChapterDto]),
    __metadata("design:returntype", Promise)
], AdminChapterController.prototype, "create", null);
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_chapter_dto_1.UpdateChapterDto]),
    __metadata("design:returntype", Promise)
], AdminChapterController.prototype, "update", null);
__decorate([
    (0, common_2.Permission)('comic.manage'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminChapterController.prototype, "delete", null);
exports.AdminChapterController = AdminChapterController = __decorate([
    (0, swagger_1.ApiTags)('Admin Chapters'),
    (0, common_1.Controller)('admin/chapters'),
    __metadata("design:paramtypes", [chapter_service_1.AdminChapterService])
], AdminChapterController);
//# sourceMappingURL=chapter.controller.js.map