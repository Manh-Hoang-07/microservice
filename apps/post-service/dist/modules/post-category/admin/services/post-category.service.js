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
exports.AdminPostCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
const common_3 = require("@package/common");
let AdminPostCategoryService = class AdminPostCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = {};
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { slug: { contains: query.search } },
            ];
        }
        if (query.parent_id !== undefined) {
            where.parent_id = query.parent_id === 'null' ? null : BigInt(query.parent_id);
        }
        const [data, total] = await Promise.all([
            this.prisma.postCategory.findMany({
                where,
                include: { children: { orderBy: { sort_order: 'asc' } } },
                orderBy: { sort_order: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.postCategory.count({ where }),
        ]);
        return { data, meta: (0, common_3.createPaginationMeta)(page, limit, total) };
    }
    async getOne(id) {
        const category = await this.prisma.postCategory.findUnique({
            where: { id },
            include: { children: { orderBy: { sort_order: 'asc' } } },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async create(dto) {
        const slug = await common_2.SlugHelper.uniqueSlug(dto.name, {
            findOne: (filter) => this.prisma.postCategory.findFirst({ where: filter }),
        });
        return this.prisma.postCategory.create({
            data: {
                name: dto.name,
                slug,
                description: dto.description,
                parent_id: dto.parent_id ? BigInt(dto.parent_id) : null,
                is_active: dto.is_active ?? true,
                sort_order: dto.sort_order ?? 0,
                seo_title: dto.seo_title,
                seo_description: dto.seo_description,
                seo_keywords: dto.seo_keywords,
            },
        });
    }
    async update(id, dto) {
        await this.getOne(id);
        const data = { ...dto };
        if (dto.parent_id !== undefined) {
            data.parent_id = dto.parent_id ? BigInt(dto.parent_id) : null;
        }
        if (dto.name) {
            data.slug = await common_2.SlugHelper.uniqueSlug(dto.name, {
                findOne: (filter) => this.prisma.postCategory.findFirst({ where: filter }),
            }, id);
        }
        return this.prisma.postCategory.update({ where: { id }, data });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.postCategory.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminPostCategoryService = AdminPostCategoryService;
exports.AdminPostCategoryService = AdminPostCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminPostCategoryService);
//# sourceMappingURL=post-category.service.js.map