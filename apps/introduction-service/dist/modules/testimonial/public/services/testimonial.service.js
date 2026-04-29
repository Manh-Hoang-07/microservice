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
exports.PublicTestimonialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const enums_1 = require("../../../../common/enums");
const common_2 = require("@package/common");
let PublicTestimonialService = class PublicTestimonialService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { status: enums_1.ACTIVE_STATUS };
        if (query.featured !== undefined) {
            where.featured = query.featured === 'true' || query.featured === true;
        }
        if (query.project_id)
            where.project_id = (0, common_2.toPrimaryKey)(query.project_id);
        if (query.search) {
            where.OR = [
                { client_name: { contains: query.search } },
                { client_company: { contains: query.search } },
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
        const item = await this.prisma.testimonial.findFirst({
            where: { id, status: enums_1.ACTIVE_STATUS },
            include: { project: { select: { id: true, name: true, slug: true } } },
        });
        if (!item)
            throw new common_1.NotFoundException('Testimonial not found');
        return item;
    }
};
exports.PublicTestimonialService = PublicTestimonialService;
exports.PublicTestimonialService = PublicTestimonialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicTestimonialService);
//# sourceMappingURL=testimonial.service.js.map