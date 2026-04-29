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
exports.AdminNotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminNotificationService = class AdminNotificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = {};
        if (query.user_id)
            where.user_id = BigInt(query.user_id);
        if (query.type)
            where.type = query.type;
        if (query.status)
            where.status = query.status;
        if (query.is_read !== undefined)
            where.is_read = query.is_read === 'true';
        const [data, total] = await Promise.all([
            this.prisma.notification.findMany({ where, orderBy: { created_at: 'desc' }, skip, take: limit }),
            this.prisma.notification.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async getOne(id) {
        const notif = await this.prisma.notification.findUnique({ where: { id } });
        if (!notif)
            throw new common_1.NotFoundException('Notification not found');
        return notif;
    }
    async create(data) {
        return this.prisma.notification.create({
            data: {
                user_id: BigInt(data.user_id),
                title: data.title,
                message: data.message,
                type: data.type || 'info',
                data: data.data,
                status: data.status || 'active',
            },
        });
    }
    async createMany(notifications) {
        return this.prisma.notification.createMany({
            data: notifications.map((n) => ({
                user_id: n.user_id,
                title: n.title,
                message: n.message,
                type: n.type || 'info',
                data: n.data,
            })),
        });
    }
    async update(id, data) {
        await this.getOne(id);
        return this.prisma.notification.update({ where: { id }, data });
    }
    async delete(id) {
        await this.getOne(id);
        await this.prisma.notification.delete({ where: { id } });
        return { success: true };
    }
};
exports.AdminNotificationService = AdminNotificationService;
exports.AdminNotificationService = AdminNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminNotificationService);
//# sourceMappingURL=notification.service.js.map