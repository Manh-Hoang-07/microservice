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
exports.PublicComicService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const redis_1 = require("@package/redis");
const enums_1 = require("../../../../common/enums");
const common_2 = require("@package/common");
let PublicComicService = class PublicComicService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { status: { in: enums_1.PUBLIC_COMIC_STATUSES } };
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { slug: { contains: query.search } },
                { author: { contains: query.search } },
            ];
        }
        if (query.comic_category_id) {
            where.categoryLinks = {
                some: { comic_category_id: BigInt(query.comic_category_id) },
            };
        }
        if (query.is_featured !== undefined) {
            where.is_featured = query.is_featured === 'true' || query.is_featured === true;
        }
        let orderBy = { updated_at: 'desc' };
        if (query.sort) {
            const [field, dir] = query.sort.split(':');
            if (['view_count', 'follow_count', 'rating_count'].includes(field)) {
                orderBy = { stats: { [field]: dir || 'desc' } };
            }
            else {
                orderBy = { [field]: dir || 'desc' };
            }
        }
        const select = {
            id: true,
            slug: true,
            title: true,
            description: true,
            cover_image: true,
            author: true,
            status: true,
            created_at: true,
            updated_at: true,
            last_chapter_id: true,
            last_chapter_updated_at: true,
            is_featured: true,
            stats: true,
            categoryLinks: {
                select: { category: { select: { id: true, name: true, slug: true } } },
            },
            chapters: {
                where: { status: 'published' },
                orderBy: { chapter_index: 'desc' },
                take: 1,
                select: {
                    id: true,
                    title: true,
                    chapter_index: true,
                    chapter_label: true,
                    created_at: true,
                },
            },
        };
        const [data, total] = await Promise.all([
            this.prisma.comic.findMany({ where, select, orderBy, skip, take: limit }),
            this.prisma.comic.count({ where }),
        ]);
        return {
            data: data.map((c) => this.transform(c)),
            meta: (0, common_2.createPaginationMeta)(page, limit, total),
        };
    }
    async getBySlug(slug) {
        const comic = await this.prisma.comic.findFirst({
            where: { slug, status: { in: enums_1.PUBLIC_COMIC_STATUSES } },
            include: {
                stats: true,
                categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
                chapters: {
                    where: { status: 'published' },
                    orderBy: { chapter_index: 'desc' },
                    take: 1,
                    select: { id: true, title: true, chapter_index: true, chapter_label: true, created_at: true },
                },
            },
        });
        if (!comic)
            throw new common_1.NotFoundException('Comic not found');
        return this.transform(comic);
    }
    async getChaptersBySlug(slug, options = {}) {
        const comic = await this.prisma.comic.findFirst({
            where: { slug, status: { in: enums_1.PUBLIC_COMIC_STATUSES } },
            select: { id: true },
        });
        if (!comic)
            throw new common_1.NotFoundException('Comic not found');
        if (this.redis.isEnabled()) {
            await this.redis.hincrby('comic:views:buffer', comic.id.toString(), 1);
        }
        const page = Math.max(Number(options.page) || 1, 1);
        const limit = Math.max(Number(options.limit) || 10000, 1);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.chapter.findMany({
                where: { comic_id: comic.id, status: 'published' },
                select: {
                    id: true,
                    comic_id: true,
                    title: true,
                    chapter_index: true,
                    chapter_label: true,
                    status: true,
                    view_count: true,
                    created_at: true,
                    updated_at: true,
                },
                orderBy: { chapter_index: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.chapter.count({
                where: { comic_id: comic.id, status: 'published' },
            }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    transform(entity) {
        if (!entity)
            return null;
        const item = { ...entity };
        if (item.categoryLinks && Array.isArray(item.categoryLinks)) {
            item.categories = item.categoryLinks.map((l) => l?.category).filter(Boolean);
            delete item.categoryLinks;
        }
        if (item.chapters && Array.isArray(item.chapters)) {
            const last = item.chapters[0];
            if (last) {
                item.last_chapter = {
                    id: last.id,
                    title: last.title,
                    chapter_index: last.chapter_index,
                    chapter_label: last.chapter_label,
                    created_at: last.created_at,
                };
            }
            delete item.chapters;
        }
        return item;
    }
};
exports.PublicComicService = PublicComicService;
exports.PublicComicService = PublicComicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_1.RedisService])
], PublicComicService);
//# sourceMappingURL=comic.service.js.map