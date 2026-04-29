"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterModule = void 0;
const common_1 = require("@nestjs/common");
const chapter_controller_1 = require("./admin/controllers/chapter.controller");
const chapter_service_1 = require("./admin/services/chapter.service");
const chapter_controller_2 = require("./public/controllers/chapter.controller");
const chapter_service_2 = require("./public/services/chapter.service");
let ChapterModule = class ChapterModule {
};
exports.ChapterModule = ChapterModule;
exports.ChapterModule = ChapterModule = __decorate([
    (0, common_1.Module)({
        controllers: [chapter_controller_1.AdminChapterController, chapter_controller_2.PublicChapterController],
        providers: [chapter_service_1.AdminChapterService, chapter_service_2.PublicChapterService],
        exports: [chapter_service_1.AdminChapterService],
    })
], ChapterModule);
//# sourceMappingURL=chapter.module.js.map