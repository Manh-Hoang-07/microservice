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
exports.PublicCommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let PublicCommentService = class PublicCommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { status: 'visible' };
        if (query.comic_id)
            where.comic_id = BigInt(query.comic_id);
        if (query.chapter_id)
            where.chapter_id = BigInt(query.chapter_id);
        where.parent_id = null;
        const [data, total] = await Promise.all([
            this.prisma.comicComment.findMany({
                where,
                include: {
                    replies: {
                        where: { status: 'visible' },
                        orderBy: { created_at: 'asc' },
                    },
                },
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.comicComment.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
};
exports.PublicCommentService = PublicCommentService;
exports.PublicCommentService = PublicCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicCommentService);
//# sourceMappingURL=comments.service.js.map