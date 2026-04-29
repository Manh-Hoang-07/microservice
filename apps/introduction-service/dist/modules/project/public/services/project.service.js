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
exports.PublicProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
const PUBLIC_PROJECT_STATUSES = ['planning', 'in_progress', 'completed'];
let PublicProjectService = class PublicProjectService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { status: { in: PUBLIC_PROJECT_STATUSES } };
        if (query.featured !== undefined) {
            where.featured = query.featured === 'true' || query.featured === true;
        }
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { slug: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.project.findMany({
                where,
                include: {
                    testimonials: {
                        where: { status: 'active' },
                        orderBy: { sort_order: 'asc' },
                    },
                },
                orderBy: { sort_order: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.project.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async getBySlug(slug) {
        const item = await this.prisma.project.findFirst({
            where: { slug, status: { in: PUBLIC_PROJECT_STATUSES } },
            include: {
                testimonials: {
                    where: { status: 'active' },
                    orderBy: { sort_order: 'asc' },
                },
            },
        });
        if (!item)
            throw new common_1.NotFoundException('Project not found');
        await this.prisma.project.update({
            where: { id: item.id },
            data: { view_count: { increment: 1 } },
        });
        return { ...item, view_count: item.view_count + 1 };
    }
};
exports.PublicProjectService = PublicProjectService;
exports.PublicProjectService = PublicProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicProjectService);
//# sourceMappingURL=project.service.js.map