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
exports.UserFollowService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let UserFollowService = class UserFollowService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async getList(userId, query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { user_id: userId };
        const [data, total] = await Promise.all([
            this.prisma.comicFollow.findMany({
                where,
                include: {
                    comic: {
                        select: { id: true, title: true, slug: true, cover_image: true, stats: true },
                    },
                },
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.comicFollow.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async follow(userId, comicId) {
        const existing = await this.prisma.comicFollow.findUnique({
            where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
        });
        if (existing)
            throw new common_1.ConflictException('Already following');
        const follow = await this.prisma.comicFollow.create({
            data: { user_id: userId, comic_id: comicId },
        });
        await this.syncFollowCount(comicId);
        if (this.config.get('kafka.enabled')) {
            await this.prisma.comicOutbox.create({
                data: {
                    event_type: 'user.followed.comic',
                    payload: {
                        user_id: Number(userId),
                        comic_id: Number(comicId),
                        followed_at: new Date().toISOString(),
                    },
                },
            });
        }
        return follow;
    }
    async unfollow(userId, comicId) {
        const existing = await this.prisma.comicFollow.findUnique({
            where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
        });
        if (!existing)
            throw new common_1.NotFoundException('Not following');
        await this.prisma.comicFollow.delete({
            where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
        });
        await this.syncFollowCount(comicId);
        if (this.config.get('kafka.enabled')) {
            await this.prisma.comicOutbox.create({
                data: {
                    event_type: 'user.unfollowed.comic',
                    payload: {
                        user_id: Number(userId),
                        comic_id: Number(comicId),
                    },
                },
            });
        }
        return { success: true };
    }
    async syncFollowCount(comicId) {
        const count = await this.prisma.comicFollow.count({ where: { comic_id: comicId } });
        await this.prisma.comicStats.upsert({
            where: { comic_id: comicId },
            create: { comic_id: comicId, follow_count: BigInt(count) },
            update: { follow_count: BigInt(count) },
        });
    }
};
exports.UserFollowService = UserFollowService;
exports.UserFollowService = UserFollowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UserFollowService);
//# sourceMappingURL=follows.service.js.map