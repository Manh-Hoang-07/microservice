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
exports.PublicPostCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
let PublicPostCategoryService = class PublicPostCategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const data = await this.prisma.postCategory.findMany({
            where: { is_active: true, parent_id: null },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                parent_id: true,
                sort_order: true,
                seo_title: true,
                seo_description: true,
                seo_keywords: true,
                children: {
                    where: { is_active: true },
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        description: true,
                        sort_order: true,
                        seo_title: true,
                        seo_description: true,
                        seo_keywords: true,
                    },
                    orderBy: { sort_order: 'asc' },
                },
            },
            orderBy: { sort_order: 'asc' },
        });
        return { data };
    }
};
exports.PublicPostCategoryService = PublicPostCategoryService;
exports.PublicPostCategoryService = PublicPostCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicPostCategoryService);
//# sourceMappingURL=post-category.service.js.map