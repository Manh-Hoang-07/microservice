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
exports.AdminTestimonialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminTestimonialService = class AdminTestimonialService {
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
        if (query.project_id)
            where.project_id = (0, common_2.toPrimaryKey)(query.project_id);
        if (query.search) {
            where.OR = [
                { client_name: { contains: query.search } },
                { client_company: { contains: query.search } },
                { content: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.testimonial.findMany({
                where,
                include: { project: { select: { id: true, name: true, slug: true } } },
                orderBy: { sort_order: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.testimonial.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async getOne(id) {
        const item = await this.prisma.testimonial.findUnique({
            where: { id },
            include: { project: { select: { id: true, name: true, slug: true } } },
        });
        if (!item)
            throw new common_1.NotFoundException('Testimonial not found');
        return item;
    }
    async create(dto) {
        return this.prisma.testimonial.create({
            data: {
                client_name: dto.client_name,
                client_position: dto.client_position,
                client_company: dto.client_company,
                client_avatar: dto.client_avatar,
                content: dto.content,
                rating: dto.rating ?? 5,
                project_id: dto.project_id ? (0, common_2.toPrimaryKey)(dto.project_id) : undefined,
                featured: dto.featured ?? false,
                status: dto.status || 'active',
                sort_order: dto.sort_order ?? 0,
            },
            include: { project: { select: { id: true, name: true, slug: true } } },
        });
    }
    async update(id, dto) {
        await this.getOne(id);
        const data = { ...dto };
        if (dto.project_id !== undefined) {
            data.project_id = dto.project_id ? (0, common_2.toPrimaryKey)(dto.project_id) : null;
        }
        return this.prisma.testimonial.update({
            where: { id },
            data,
            include: { project: { select: { id: true, name: true, slug: true } } },
        });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.testimonial.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminTestimonialService = AdminTestimonialService;
exports.AdminTestimonialService = AdminTestimonialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminTestimonialService);
//# sourceMappingURL=testimonial.service.js.map