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
exports.AdminProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
const common_3 = require("@package/common");
let AdminProjectService = class AdminProjectService {
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
        if (query.featured !== undefined) {
            where.featured = query.featured === 'true' || query.featured === true;
        }
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { slug: { contains: query.search } },
                { client_name: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.project.findMany({
                where,
                include: { testimonials: true },
                orderBy: { sort_order: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.project.count({ where }),
        ]);
        return { data, meta: (0, common_3.createPaginationMeta)(page, limit, total) };
    }
    async getOne(id) {
        const item = await this.prisma.project.findUnique({
            where: { id },
            include: { testimonials: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Project not found');
        return item;
    }
    async create(dto) {
        const slug = await common_2.SlugHelper.uniqueSlug(dto.slug || dto.name, {
            findOne: (filter) => this.prisma.project.findFirst({ where: filter }),
        });
        return this.prisma.project.create({
            data: {
                name: dto.name,
                slug,
                description: dto.description,
                short_description: dto.short_description,
                cover_image: dto.cover_image,
                location: dto.location,
                area: dto.area,
                start_date: dto.start_date ? new Date(dto.start_date) : undefined,
                end_date: dto.end_date ? new Date(dto.end_date) : undefined,
                status: dto.status || 'planning',
                client_name: dto.client_name,
                budget: dto.budget,
                images: dto.images ?? [],
                featured: dto.featured ?? false,
                sort_order: dto.sort_order ?? 0,
                seo_title: dto.seo_title,
                seo_description: dto.seo_description,
                seo_keywords: dto.seo_keywords,
            },
            include: { testimonials: true },
        });
    }
    async update(id, dto) {
        await this.getOne(id);
        const data = { ...dto };
        if (dto.name || dto.slug) {
            data.slug = await common_2.SlugHelper.uniqueSlug(dto.slug || dto.name || '', {
                findOne: (filter) => this.prisma.project.findFirst({ where: filter }),
            }, id);
        }
        if (dto.start_date)
            data.start_date = new Date(dto.start_date);
        if (dto.end_date)
            data.end_date = new Date(dto.end_date);
        return this.prisma.project.update({
            where: { id },
            data,
            include: { testimonials: true },
        });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.project.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminProjectService = AdminProjectService;
exports.AdminProjectService = AdminProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminProjectService);
//# sourceMappingURL=project.service.js.map