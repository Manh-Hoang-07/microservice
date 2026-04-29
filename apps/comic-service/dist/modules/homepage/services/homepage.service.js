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
exports.HomepageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const redis_1 = require("@package/redis");
const enums_1 = require("../../../common/enums");
let HomepageService = class HomepageService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async getTopViewed(limit) {
        return this.cached('homepage:top-viewed', 420, () => this.getComics({ stats: { view_count: 'desc' } }, limit));
    }
    async getPopular(limit) {
        return this.cached('homepage:popular', 1200, () => this.getComics({ stats: { follow_count: 'desc' } }, limit));
    }
    async getNewest(limit) {
        return this.cached('homepage:newest', 120, () => this.getComics({ created_at: 'desc' }, limit));
    }
    async getRecentlyUpdated(limit) {
        return this.cached('homepage:recently-updated', 120, () => this.getComics({ last_chapter_updated_at: 'desc' }, limit));
    }
    async getCategories() {
        return this.cached('homepage:categories', 43200, () => this.prisma.comicCategory.findMany({
            select: { id: true, name: true, slug: true },
            orderBy: { name: 'asc' },
        }));
    }
    async getComics(orderBy, limit) {
        return this.prisma.comic.findMany({
            where: { status: { in: enums_1.PUBLIC_COMIC_STATUSES } },
            select: {
                id: true,
                slug: true,
                title: true,
                cover_image: true,
                author: true,
                status: true,
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
                    select: { id: true, title: true, chapter_index: true, chapter_label: true, created_at: true },
                },
            },
            orderBy,
            take: limit,
        });
    }
    async cached(key, ttl, fn) {
        if (this.redis.isEnabled()) {
            const cached = await this.redis.get(`comic:cache:${key}`);
            if (cached)
                return JSON.parse(cached);
        }
        const result = await fn();
        if (this.redis.isEnabled()) {
            await this.redis.set(`comic:cache:${key}`, JSON.stringify(result, (_, v) => typeof v === 'bigint' ? Number(v) : v), ttl);
        }
        return result;
    }
};
exports.HomepageService = HomepageService;
exports.HomepageService = HomepageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_1.RedisService])
], HomepageService);
//# sourceMappingURL=homepage.service.js.map