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
exports.AdminBannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminBannerService = class AdminBannerService {
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
        if (query.location_id)
            where.location_id = (0, common_2.toPrimaryKey)(query.location_id);
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { subtitle: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.banner.findMany({
                where,
                include: { location: true },
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
    async getOne(id) {
        const banner = await this.prisma.banner.findUnique({
            where: { id },
            include: { location: true },
        });
        if (!banner)
            throw new common_1.NotFoundException('Banner not found');
        return banner;
    }
    async create(dto) {
        const locationId = (0, common_2.toPrimaryKey)(dto.location_id);
        const location = await this.prisma.bannerLocation.findUnique({
            where: { id: locationId },
        });
        if (!location)
            throw new common_1.NotFoundException('Banner location not found');
        const data = {
            title: dto.title,
            subtitle: dto.subtitle,
            image: dto.image,
            mobile_image: dto.mobile_image,
            link: dto.link,
            link_target: dto.link_target,
            description: dto.description,
            button_text: dto.button_text,
            button_color: dto.button_color,
            text_color: dto.text_color,
            location_id: locationId,
            sort_order: dto.sort_order ?? 0,
            status: dto.status || 'active',
        };
        if (dto.start_date)
            data.start_date = new Date(dto.start_date);
        if (dto.end_date)
            data.end_date = new Date(dto.end_date);
        const banner = await this.prisma.banner.create({ data });
        return this.getOne(banner.id);
    }
    async update(id, dto) {
        await this.getOne(id);
        if (dto.location_id) {
            const locationId = (0, common_2.toPrimaryKey)(dto.location_id);
            const location = await this.prisma.bannerLocation.findUnique({
                where: { id: locationId },
            });
            if (!location)
                throw new common_1.NotFoundException('Banner location not found');
        }
        const data = { ...dto };
        if (dto.location_id)
            data.location_id = (0, common_2.toPrimaryKey)(dto.location_id);
        if (dto.start_date)
            data.start_date = new Date(dto.start_date);
        if (dto.end_date)
            data.end_date = new Date(dto.end_date);
        await this.prisma.banner.update({ where: { id }, data });
        return this.getOne(id);
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.banner.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminBannerService = AdminBannerService;
exports.AdminBannerService = AdminBannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminBannerService);
//# sourceMappingURL=banner.service.js.map