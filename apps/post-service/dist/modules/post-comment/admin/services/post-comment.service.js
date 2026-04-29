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
exports.AdminPostCommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let AdminPostCommentService = class AdminPostCommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = {};
        if (query.post_id)
            where.post_id = BigInt(query.post_id);
        if (query.status)
            where.status = query.status;
        const [data, total] = await Promise.all([
            this.prisma.postComment.findMany({
                where,
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.postComment.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async updateStatus(id, status) {
        const comment = await this.prisma.postComment.findUnique({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        return this.prisma.postComment.update({ where: { id }, data: { status } });
    }
};
exports.AdminPostCommentService = AdminPostCommentService;
exports.AdminPostCommentService = AdminPostCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminPostCommentService);
//# sourceMappingURL=post-comment.service.js.map