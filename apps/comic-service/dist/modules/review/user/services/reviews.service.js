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
exports.UserReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
let UserReviewService = class UserReviewService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdate(userId, dto) {
        const comicId = BigInt(dto.comic_id);
        const review = await this.prisma.comicReview.upsert({
            where: {
                user_id_comic_id: { user_id: userId, comic_id: comicId },
            },
            create: {
                user_id: userId,
                comic_id: comicId,
                rating: dto.rating,
                content: dto.content,
            },
            update: {
                rating: dto.rating,
                content: dto.content,
            },
        });
        await this.syncRatingStats(comicId);
        return review;
    }
    async delete(userId, id) {
        const review = await this.prisma.comicReview.findUnique({ where: { id } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        if (review.user_id !== userId)
            throw new common_1.ForbiddenException('Not your review');
        await this.prisma.comicReview.delete({ where: { id } });
        await this.syncRatingStats(review.comic_id);
        return { success: true };
    }
    async syncRatingStats(comicId) {
        const agg = await this.prisma.comicReview.aggregate({
            where: { comic_id: comicId },
            _count: true,
            _sum: { rating: true },
        });
        await this.prisma.comicStats.upsert({
            where: { comic_id: comicId },
            create: {
                comic_id: comicId,
                rating_count: BigInt(agg._count || 0),
                rating_sum: BigInt(agg._sum?.rating || 0),
            },
            update: {
                rating_count: BigInt(agg._count || 0),
                rating_sum: BigInt(agg._sum?.rating || 0),
            },
        });
    }
};
exports.UserReviewService = UserReviewService;
exports.UserReviewService = UserReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserReviewService);
//# sourceMappingURL=reviews.service.js.map