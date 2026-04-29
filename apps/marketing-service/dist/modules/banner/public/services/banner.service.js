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
exports.PublicBannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let PublicBannerService = class PublicBannerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 20, 1);
        const skip = (page - 1) * limit;
        const now = new Date();
        const where = {
            status: 'active',
            OR: [
                { start_date: null },
                { start_date: { lte: now } },
            ],
            AND: [
                {
                    OR: [
                        { end_date: null },
                        { end_date: { gte: now } },
                    ],
                },
            ],
        };
        if (query.location_id) {
            where.location_id = (0, common_2.toPrimaryKey)(query.location_id);
        }
        if (query.location_code) {
            where.location = { code: query.location_code };
        }
        const [data, total] = await Promise.all([
            this.prisma.banner.findMany({
                where,
                include: { location: { select: { id: true, code: true, name: true } } },
                orderBy: { sort_order: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.banner.count({ where }),
        ]);
        return {
            data,
            meta: (0, common_2.createPaginationMeta)(page, limit, total),
        };
    }
};
exports.PublicBannerService = PublicBannerService;
exports.PublicBannerService = PublicBannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicBannerService);
//# sourceMappingURL=banner.service.js.map