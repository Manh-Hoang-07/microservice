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
exports.AdminChapterService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminChapterService = class AdminChapterService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = {};
        if (query.comic_id)
            where.comic_id = BigInt(query.comic_id);
        if (query.status)
            where.status = query.status;
        const [data, total] = await Promise.all([
            this.prisma.chapter.findMany({
                where,
                include: { pages: { orderBy: { page_number: 'asc' } } },
                orderBy: { chapter_index: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.chapter.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async getSimpleList(query) {
        const where = {};
        if (query.comic_id)
            where.comic_id = BigInt(query.comic_id);
        const data = await this.prisma.chapter.findMany({
            where,
            select: { id: true, title: true, chapter_index: true, chapter_label: true, status: true },
            orderBy: { chapter_index: 'desc' },
            take: 100,
        });
        return { data };
    }
    async getOne(id) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { id },
            include: { pages: { orderBy: { page_number: 'asc' } } },
        });
        if (!chapter)
            throw new common_1.NotFoundException('Chapter not found');
        return chapter;
    }
    async create(dto) {
        const existing = await this.prisma.chapter.findFirst({
            where: { comic_id: BigInt(dto.comic_id), chapter_index: dto.chapter_index },
        });
        if (existing)
            throw new common_1.BadRequestException('Chapter index already exists for this comic');
        const chapter = await this.prisma.chapter.create({
            data: {
                comic_id: BigInt(dto.comic_id),
                team_id: dto.team_id ? BigInt(dto.team_id) : null,
                title: dto.title,
                chapter_index: dto.chapter_index,
                chapter_label: dto.chapter_label,
                status: dto.status || 'draft',
            },
        });
        if (dto.pages?.length) {
            await this.prisma.chapterPage.createMany({
                data: dto.pages.map((p, i) => ({
                    chapter_id: chapter.id,
                    page_number: i + 1,
                    image_url: p.image_url,
                    width: p.width,
                    height: p.height,
                    file_size: p.file_size ? BigInt(p.file_size) : null,
                })),
            });
        }
        if (chapter.status === 'published') {
            await this.handlePublish(chapter);
        }
        return this.getOne(chapter.id);
    }
    async update(id, dto) {
        const existing = await this.getOne(id);
        const data = {};
        if (dto.title !== undefined)
            data.title = dto.title;
        if (dto.chapter_index !== undefined)
            data.chapter_index = dto.chapter_index;
        if (dto.chapter_label !== undefined)
            data.chapter_label = dto.chapter_label;
        if (dto.status !== undefined)
            data.status = dto.status;
        const chapter = await this.prisma.chapter.update({ where: { id }, data });
        if (dto.pages !== undefined) {
            await this.prisma.chapterPage.deleteMany({ where: { chapter_id: id } });
            if (dto.pages.length) {
                await this.prisma.chapterPage.createMany({
                    data: dto.pages.map((p, i) => ({
                        chapter_id: id,
                        page_number: i + 1,
                        image_url: p.image_url,
                        width: p.width,
                        height: p.height,
                        file_size: p.file_size ? BigInt(p.file_size) : null,
                    })),
                });
            }
        }
        if (dto.status === 'published' && existing.status !== 'published') {
            await this.handlePublish(chapter);
        }
        return this.getOne(id);
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.chapter.delete({ where: { id } });
        return { success: true };
    }
    async handlePublish(chapter) {
        await this.prisma.comic.update({
            where: { id: chapter.comic_id },
            data: {
                last_chapter_id: chapter.id,
                last_chapter_updated_at: new Date(),
            },
        });
        const comic = await this.prisma.comic.findUnique({
            where: { id: chapter.comic_id },
            select: { id: true, title: true, slug: true },
        });
        const kafkaEnabled = this.config.get('kafka.enabled');
        if (kafkaEnabled && comic) {
            await this.prisma.comicOutbox.create({
                data: {
                    event_type: 'comic.chapter.published',
                    payload: {
                        comic_id: Number(comic.id),
                        comic_title: comic.title,
                        comic_slug: comic.slug,
                        chapter_id: Number(chapter.id),
                        chapter_index: chapter.chapter_index,
                        chapter_label: chapter.chapter_label || `Chapter ${chapter.chapter_index}`,
                        published_at: new Date().toISOString(),
                    },
                },
            });
        }
    }
};
exports.AdminChapterService = AdminChapterService;
exports.AdminChapterService = AdminChapterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AdminChapterService);
//# sourceMappingURL=chapter.service.js.map