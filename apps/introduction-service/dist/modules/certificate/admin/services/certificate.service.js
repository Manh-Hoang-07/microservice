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
exports.AdminCertificateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminCertificateService = class AdminCertificateService {
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
        if (query.type)
            where.type = query.type;
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { issued_by: { contains: query.search } },
                { certificate_number: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.certificate.findMany({
                where,
                orderBy: { sort_order: 'asc' },
                skip,
                take: limit,
            }),
            this.prisma.certificate.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async getOne(id) {
        const item = await this.prisma.certificate.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Certificate not found');
        return item;
    }
    async create(dto) {
        return this.prisma.certificate.create({
            data: {
                name: dto.name,
                image: dto.image,
                issued_by: dto.issued_by,
                issued_date: dto.issued_date ? new Date(dto.issued_date) : undefined,
                expiry_date: dto.expiry_date ? new Date(dto.expiry_date) : undefined,
                certificate_number: dto.certificate_number,
                description: dto.description,
                type: dto.type,
                status: dto.status || 'active',
                sort_order: dto.sort_order ?? 0,
            },
        });
    }
    async update(id, dto) {
        await this.getOne(id);
        const data = { ...dto };
        if (dto.issued_date)
            data.issued_date = new Date(dto.issued_date);
        if (dto.expiry_date)
            data.expiry_date = new Date(dto.expiry_date);
        return this.prisma.certificate.update({ where: { id }, data });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.certificate.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminCertificateService = AdminCertificateService;
exports.AdminCertificateService = AdminCertificateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminCertificateService);
//# sourceMappingURL=certificate.service.js.map