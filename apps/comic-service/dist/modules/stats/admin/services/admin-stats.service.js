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
exports.AdminStatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
let AdminStatsService = class AdminStatsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard() {
        const [totalComics, totalViews, totalFollows] = await Promise.all([
            this.prisma.comic.count(),
            this.prisma.comicStats.aggregate({ _sum: { view_count: true } }),
            this.prisma.comicStats.aggregate({ _sum: { follow_count: true } }),
        ]);
        const topComics = await this.prisma.comic.findMany({
            include: { stats: true },
            orderBy: { stats: { view_count: 'desc' } },
            take: 10,
        });
        return {
            total_comics: totalComics,
            total_views: totalViews._sum?.view_count || 0,
            total_follows: totalFollows._sum?.follow_count || 0,
            top_comics: topComics,
        };
    }
    async getTopComics(query) {
        const limit = Math.max(Number(query.limit) || 10, 1);
        const sortBy = query.sort_by || 'views';
        const orderBy = sortBy === 'follows'
            ? { stats: { follow_count: 'desc' } }
            : sortBy === 'rating'
                ? { stats: { rating_sum: 'desc' } }
                : { stats: { view_count: 'desc' } };
        const data = await this.prisma.comic.findMany({
            include: { stats: true },
            orderBy,
            take: limit,
        });
        return { data };
    }
};
exports.AdminStatsService = AdminStatsService;
exports.AdminStatsService = AdminStatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminStatsService);
//# sourceMappingURL=admin-stats.service.js.map