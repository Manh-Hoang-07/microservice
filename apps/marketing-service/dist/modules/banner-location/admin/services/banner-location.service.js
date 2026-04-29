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
exports.AdminBannerLocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminBannerLocationService = class AdminBannerLocationService {
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
                { name: { contains: query.search } },
                { code: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.bannerLocation.findMany({
                where,
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.bannerLocation.count({ where }),
        ]);
        return {
            data,
            meta: (0, common_2.createPaginationMeta)(page, limit, total),
        };
    }
    async getOne(id) {
        const location = await this.prisma.bannerLocation.findUnique({
            where: { id },
            include: { banners: true },
        });
        if (!location)
            throw new common_1.NotFoundException('Banner location not found');
        return location;
    }
    async create(dto) {
        const existing = await this.prisma.bannerLocation.findUnique({
            where: { code: dto.code },
        });
        if (existing)
            throw new common_1.ConflictException('Banner location code already exists');
        return this.prisma.bannerLocation.create({
            data: {
                code: dto.code,
                name: dto.name,
                description: dto.description,
                status: dto.status || 'active',
            },
        });
    }
    async update(id, dto) {
        await this.getOne(id);
        if (dto.code) {
            const existing = await this.prisma.bannerLocation.findFirst({
                where: { code: dto.code, NOT: { id } },
            });
            if (existing)
                throw new common_1.ConflictException('Banner location code already exists');
        }
        return this.prisma.bannerLocation.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.bannerLocation.delete({ where: { id } });
        return { success: true };
    }
    async changeStatus(id, status) {
        await this.getOne(id);
        return this.prisma.bannerLocation.update({
            where: { id },
            data: { status },
        });
    }
};
exports.AdminBannerLocationService = AdminBannerLocationService;
exports.AdminBannerLocationService = AdminBannerLocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminBannerLocationService);
//# sourceMappingURL=banner-location.service.js.map