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
exports.AdminContactService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminContactService = class AdminContactService {
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
        if (query.search) {
            where.OR = [
                { name: { contains: query.search } },
                { email: { contains: query.search } },
                { phone: { contains: query.search } },
            ];
        }
        const [data, total] = await Promise.all([
            this.prisma.contact.findMany({
                where,
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.contact.count({ where }),
        ]);
        return {
            data,
            meta: (0, common_2.createPaginationMeta)(page, limit, total),
        };
    }
    async getOne(id) {
        const contact = await this.prisma.contact.findUnique({
            where: { id },
        });
        if (!contact)
            throw new common_1.NotFoundException('Contact not found');
        return contact;
    }
    async reply(id, replyText, userId) {
        await this.getOne(id);
        return this.prisma.contact.update({
            where: { id },
            data: {
                reply: replyText,
                status: 'Replied',
                replied_at: new Date(),
                replied_by: userId,
            },
        });
    }
    async markAsRead(id) {
        await this.getOne(id);
        return this.prisma.contact.update({
            where: { id },
            data: { status: 'Read' },
        });
    }
    async closeContact(id) {
        await this.getOne(id);
        return this.prisma.contact.update({
            where: { id },
            data: { status: 'Closed' },
        });
    }
};
exports.AdminContactService = AdminContactService;
exports.AdminContactService = AdminContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminContactService);
//# sourceMappingURL=contact.service.js.map