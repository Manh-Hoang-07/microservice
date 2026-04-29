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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicChapterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
let PublicChapterService = class PublicChapterService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOne(id) {
        const chapter = await this.prisma.chapter.findFirst({
            where: { id, status: 'published' },
            include: {
                pages: { orderBy: { page_number: 'asc' } },
                comic: { select: { id: true, title: true, slug: true } },
            },
        });
        if (!chapter)
            throw new common_1.NotFoundException('Chapter not found');
        return chapter;
    }
    async getPages(id) {
        const chapter = await this.prisma.chapter.findFirst({
            where: { id, status: 'published' },
        });
        if (!chapter)
            throw new common_1.NotFoundException('Chapter not found');
        const pages = await this.prisma.chapterPage.findMany({
            where: { chapter_id: id },
            orderBy: { page_number: 'asc' },
        });
        return { data: pages };
    }
    async getNext(id) {
        const current = await this.prisma.chapter.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Chapter not found');
        const next = await this.prisma.chapter.findFirst({
            where: {
                comic_id: current.comic_id,
                chapter_index: { gt: current.chapter_index },
                status: 'published',
            },
            orderBy: { chapter_index: 'asc' },
            select: { id: true, title: true, chapter_index: true, chapter_label: true },
        });
        return next || null;
    }
    async getPrev(id) {
        const current = await this.prisma.chapter.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Chapter not found');
        const prev = await this.prisma.chapter.findFirst({
            where: {
                comic_id: current.comic_id,
                chapter_index: { lt: current.chapter_index },
                status: 'published',
            },
            orderBy: { chapter_index: 'desc' },
            select: { id: true, title: true, chapter_index: true, chapter_label: true },
        });
        return prev || null;
    }
};
exports.PublicChapterService = PublicChapterService;
exports.PublicChapterService = PublicChapterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicChapterService);
//# sourceMappingURL=chapter.service.js.map