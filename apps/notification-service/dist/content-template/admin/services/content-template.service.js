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
exports.AdminContentTemplateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminContentTemplateService = class AdminContentTemplateService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = {};
        if (query.type)
            where.type = query.type;
        if (query.category)
            where.category = query.category;
        if (query.status)
            where.status = query.status;
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { code: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.contentTemplate.findMany({ where, orderBy: { created_at: 'desc' }, skip, take: limit }),
            this.prisma.contentTemplate.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async getOne(id) {
        const template = await this.prisma.contentTemplate.findUnique({ where: { id } });
        if (!template)
            throw new common_1.NotFoundException('Content template not found');
        return template;
    }
    async create(dto) {
        const existing = await this.prisma.contentTemplate.findUnique({ where: { code: dto.code } });
        if (existing)
            throw new common_1.BadRequestException('Template code already exists');
        return this.prisma.contentTemplate.create({ data: dto });
    }
    async update(id, dto) {
        await this.getOne(id);
        if (dto.code) {
            const existing = await this.prisma.contentTemplate.findFirst({
                where: { code: dto.code, id: { not: id } },
            });
            if (existing)
                throw new common_1.BadRequestException('Template code already exists');
        }
        return this.prisma.contentTemplate.update({ where: { id }, data: dto });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.contentTemplate.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminContentTemplateService = AdminContentTemplateService;
exports.AdminContentTemplateService = AdminContentTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminContentTemplateService);
//# sourceMappingURL=content-template.service.js.map