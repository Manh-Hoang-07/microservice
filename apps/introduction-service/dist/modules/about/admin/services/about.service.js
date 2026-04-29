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
exports.AdminAboutService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
const common_3 = require("@package/common");
let AdminAboutService = class AdminAboutService {
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
        if (query.section_type)
            where.section_type = query.section_type;
        if (query.search) {
            where.OR = [
                { title: { contains: query.search } },
                { slug: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.aboutSection.findMany({
                where,
                orderBy: { sort_order: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.aboutSection.count({ where }),
        ]);
        return { data, meta: (0, common_3.createPaginationMeta)(page, limit, total) };
    }
    async getOne(id) {
        const item = await this.prisma.aboutSection.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('About section not found');
        return item;
    }
    async create(dto) {
        const slug = await common_2.SlugHelper.uniqueSlug(dto.slug || dto.title, {
            findOne: (filter) => this.prisma.aboutSection.findFirst({ where: filter }),
        });
        return this.prisma.aboutSection.create({
            data: {
                title: dto.title,
                slug,
                content: dto.content,
                image: dto.image,
                video_url: dto.video_url,
                section_type: dto.section_type || 'general',
                status: dto.status || 'active',
                sort_order: dto.sort_order ?? 0,
            },
        });
    }
    async update(id, dto) {
        await this.getOne(id);
        const data = { ...dto };
        if (dto.title || dto.slug) {
            data.slug = await common_2.SlugHelper.uniqueSlug(dto.slug || dto.title || '', {
                findOne: (filter) => this.prisma.aboutSection.findFirst({ where: filter }),
            }, id);
        }
        return this.prisma.aboutSection.update({ where: { id }, data });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.aboutSection.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminAboutService = AdminAboutService;
exports.AdminAboutService = AdminAboutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminAboutService);
//# sourceMappingURL=about.service.js.map