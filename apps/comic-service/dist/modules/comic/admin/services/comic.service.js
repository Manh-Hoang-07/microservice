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
exports.AdminComicService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
const common_3 = require("@package/common");
let AdminComicService = class AdminComicService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = {};
        if (query.status)
            where.status = query.status;
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { slug: { contains: query.search } },
                { author: { contains: query.search } },
            ];
        }
        if (query.is_featured !== undefined) {
            where.is_featured = query.is_featured === 'true' || query.is_featured === true;
        }
        const [data, total] = await Promise.all([
            this.prisma.comic.findMany({
                where,
                include: {
                    stats: true,
                    categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
                },
                orderBy: { updated_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.comic.count({ where }),
        ]);
        return {
            data: data.map((c) => this.transform(c)),
            meta: (0, common_3.createPaginationMeta)(page, limit, total),
        };
    }
    async getSimpleList(query) {
        const limit = Math.max(Number(query.limit) || 50, 1);
        const where = {};
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { slug: { contains: query.search } },
            ];
        }
        const data = await this.prisma.comic.findMany({
            where,
            select: { id: true, title: true, slug: true, status: true },
            orderBy: { title: 'asc' },
            take: limit,
        });
        return { data };
    }
    async getOne(id) {
        const comic = await this.prisma.comic.findUnique({
            where: { id },
            include: {
                stats: true,
                categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
            },
        });
        if (!comic)
            throw new common_1.NotFoundException('Comic not found');
        return this.transform(comic);
    }
    async create(dto) {
        const slug = await common_2.SlugHelper.uniqueSlug(dto.title, {
            findOne: (filter) => this.prisma.comic.findFirst({ where: filter }),
        });
        const comic = await this.prisma.comic.create({
            data: {
                title: dto.title,
                slug,
                description: dto.description,
                cover_image: dto.cover_image,
                author: dto.author,
                status: dto.status || 'draft',
                is_featured: dto.is_featured || false,
            },
        });
        await this.prisma.comicStats.create({
            data: { comic_id: comic.id },
        });
        if (dto.category_ids?.length) {
            await this.syncCategories(comic.id, dto.category_ids);
        }
        return this.getOne(comic.id);
    }
    async update(id, dto) {
        await this.getOne(id);
        const data = { ...dto };
        delete data.category_ids;
        if (dto.title || dto.slug) {
            data.slug = await common_2.SlugHelper.uniqueSlug(dto.slug || dto.title || '', {
                findOne: (filter) => this.prisma.comic.findFirst({ where: filter }),
            }, id);
        }
        await this.prisma.comic.update({ where: { id }, data });
        if (dto.category_ids !== undefined) {
            await this.syncCategories(id, dto.category_ids);
        }
        return this.getOne(id);
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.comic.delete({ where: { id } });
        return { success: true };
    }
    async syncCategories(comicId, categoryIds) {
        await this.prisma.comicCategoryOnComic.deleteMany({ where: { comic_id: comicId } });
        if (categoryIds.length > 0) {
            await this.prisma.comicCategoryOnComic.createMany({
                data: categoryIds.map((catId) => ({
                    comic_id: comicId,
                    comic_category_id: (0, common_3.toPrimaryKey)(catId),
                })),
            });
        }
    }
    transform(entity) {
        if (!entity)
            return null;
        const item = { ...entity };
        if (item.categoryLinks && Array.isArray(item.categoryLinks)) {
            item.categories = item.categoryLinks.map((l) => l?.category).filter(Boolean);
            item.category_ids = item.categories.map((c) => c.id);
            delete item.categoryLinks;
        }
        return item;
    }
};
exports.AdminComicService = AdminComicService;
exports.AdminComicService = AdminComicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminComicService);
//# sourceMappingURL=comic.service.js.map