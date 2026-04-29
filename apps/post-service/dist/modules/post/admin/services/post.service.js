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
exports.AdminPostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
const common_3 = require("@package/common");
let AdminPostService = class AdminPostService {
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
        if (query.post_type)
            where.post_type = query.post_type;
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { slug: { contains: query.search } },
            ];
        }
        if (query.is_featured !== undefined) {
            where.is_featured = query.is_featured === 'true' || query.is_featured === true;
        }
        if (query.is_pinned !== undefined) {
            where.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
        }
        const [data, total] = await Promise.all([
            this.prisma.post.findMany({
                where,
                include: {
                    stats: true,
                    categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
                    tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
                },
                orderBy: { updated_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.post.count({ where }),
        ]);
        return {
            data: data.map((p) => this.transform(p)),
            meta: (0, common_3.createPaginationMeta)(page, limit, total),
        };
    }
    async getSimpleList(query) {
        const limit = Math.max(Number(query.limit) || 50, 1);
        const where = {};
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { slug: { contains: query.search } },
            ];
        }
        const data = await this.prisma.post.findMany({
            where,
            select: { id: true, name: true, slug: true, status: true },
            orderBy: { name: 'asc' },
            take: limit,
        });
        return { data };
    }
    async getOne(id) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                stats: true,
                categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
                tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
            },
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return this.transform(post);
    }
    async create(dto) {
        const slug = await common_2.SlugHelper.uniqueSlug(dto.name, {
            findOne: (filter) => this.prisma.post.findFirst({ where: filter }),
        });
        const post = await this.prisma.post.create({
            data: {
                name: dto.name,
                slug,
                excerpt: dto.excerpt,
                content: dto.content,
                image: dto.image,
                cover_image: dto.cover_image,
                status: dto.status || 'draft',
                post_type: dto.post_type || 'text',
                video_url: dto.video_url,
                audio_url: dto.audio_url,
                is_featured: dto.is_featured || false,
                is_pinned: dto.is_pinned || false,
                published_at: dto.published_at ? new Date(dto.published_at) : null,
                seo_title: dto.seo_title,
                seo_description: dto.seo_description,
                seo_keywords: dto.seo_keywords,
            },
        });
        await this.prisma.postStats.create({
            data: { post_id: post.id },
        });
        if (dto.category_ids?.length) {
            await this.syncCategories(post.id, dto.category_ids);
        }
        if (dto.tag_ids?.length) {
            await this.syncTags(post.id, dto.tag_ids);
        }
        return this.getOne(post.id);
    }
    async update(id, dto) {
        await this.getOne(id);
        const data = { ...dto };
        delete data.category_ids;
        delete data.tag_ids;
        if (dto.name || dto.slug) {
            data.slug = await common_2.SlugHelper.uniqueSlug(dto.slug || dto.name || '', {
                findOne: (filter) => this.prisma.post.findFirst({ where: filter }),
            }, id);
        }
        if (dto.published_at !== undefined) {
            data.published_at = dto.published_at ? new Date(dto.published_at) : null;
        }
        await this.prisma.post.update({ where: { id }, data });
        if (dto.category_ids !== undefined) {
            await this.syncCategories(id, dto.category_ids);
        }
        if (dto.tag_ids !== undefined) {
            await this.syncTags(id, dto.tag_ids);
        }
        return this.getOne(id);
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.post.delete({ where: { id } });
        return { success: true };
    }
    async syncCategories(postId, categoryIds) {
        await this.prisma.postPostcategory.deleteMany({ where: { post_id: postId } });
        if (categoryIds.length > 0) {
            await this.prisma.postPostcategory.createMany({
                data: categoryIds.map((catId) => ({
                    post_id: postId,
                    post_category_id: (0, common_3.toPrimaryKey)(catId),
                })),
            });
        }
    }
    async syncTags(postId, tagIds) {
        await this.prisma.postPosttag.deleteMany({ where: { post_id: postId } });
        if (tagIds.length > 0) {
            await this.prisma.postPosttag.createMany({
                data: tagIds.map((tagId) => ({
                    post_id: postId,
                    post_tag_id: (0, common_3.toPrimaryKey)(tagId),
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
        if (item.tagLinks && Array.isArray(item.tagLinks)) {
            item.tags = item.tagLinks.map((l) => l?.tag).filter(Boolean);
            item.tag_ids = item.tags.map((t) => t.id);
            delete item.tagLinks;
        }
        return item;
    }
};
exports.AdminPostService = AdminPostService;
exports.AdminPostService = AdminPostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminPostService);
//# sourceMappingURL=post.service.js.map