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
exports.PublicPostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const redis_1 = require("@package/redis");
const enums_1 = require("../../../../common/enums");
const common_2 = require("@package/common");
let PublicPostService = class PublicPostService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { status: { in: enums_1.PUBLIC_POST_STATUSES } };
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { slug: { contains: query.search } },
            ];
        }
        if (query.post_category_id) {
            where.categoryLinks = {
                some: { post_category_id: BigInt(query.post_category_id) },
            };
        }
        if (query.post_tag_id) {
            where.tagLinks = {
                some: { post_tag_id: BigInt(query.post_tag_id) },
            };
        }
        if (query.post_type) {
            where.post_type = query.post_type;
        }
        if (query.is_featured !== undefined) {
            where.is_featured = query.is_featured === 'true' || query.is_featured === true;
        }
        if (query.is_pinned !== undefined) {
            where.is_pinned = query.is_pinned === 'true' || query.is_pinned === true;
        }
        let orderBy = { published_at: 'desc' };
        if (query.sort) {
            const [field, dir] = query.sort.split(':');
            if (['view_count'].includes(field)) {
                orderBy = { stats: { [field]: dir || 'desc' } };
            }
            else {
                orderBy = { [field]: dir || 'desc' };
            }
        }
        const select = {
            id: true,
            slug: true,
            name: true,
            excerpt: true,
            image: true,
            cover_image: true,
            status: true,
            post_type: true,
            video_url: true,
            audio_url: true,
            is_featured: true,
            is_pinned: true,
            published_at: true,
            seo_title: true,
            seo_description: true,
            seo_keywords: true,
            created_at: true,
            updated_at: true,
            stats: true,
            categoryLinks: {
                select: { category: { select: { id: true, name: true, slug: true } } },
            },
            tagLinks: {
                select: { tag: { select: { id: true, name: true, slug: true } } },
            },
        };
        const [data, total] = await Promise.all([
            this.prisma.post.findMany({ where, select, orderBy, skip, take: limit }),
            this.prisma.post.count({ where }),
        ]);
        return {
            data: data.map((p) => this.transform(p)),
            meta: (0, common_2.createPaginationMeta)(page, limit, total),
        };
    }
    async getBySlug(slug) {
        const post = await this.prisma.post.findFirst({
            where: { slug, status: { in: enums_1.PUBLIC_POST_STATUSES } },
            include: {
                stats: true,
                categoryLinks: { select: { category: { select: { id: true, name: true, slug: true } } } },
                tagLinks: { select: { tag: { select: { id: true, name: true, slug: true } } } },
            },
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        if (this.redis.isEnabled()) {
            await this.redis.hincrby('post:views:buffer', post.id.toString(), 1);
        }
        return this.transform(post);
    }
    transform(entity) {
        if (!entity)
            return null;
        const item = { ...entity };
        if (item.categoryLinks && Array.isArray(item.categoryLinks)) {
            item.categories = item.categoryLinks.map((l) => l?.category).filter(Boolean);
            delete item.categoryLinks;
        }
        if (item.tagLinks && Array.isArray(item.tagLinks)) {
            item.tags = item.tagLinks.map((l) => l?.tag).filter(Boolean);
            delete item.tagLinks;
        }
        return item;
    }
};
exports.PublicPostService = PublicPostService;
exports.PublicPostService = PublicPostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_1.RedisService])
], PublicPostService);
//# sourceMappingURL=post.service.js.map