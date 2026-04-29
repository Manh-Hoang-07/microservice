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
exports.UserBookmarkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let UserBookmarkService = class UserBookmarkService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(userId, query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { user_id: userId };
        const [data, total] = await Promise.all([
            this.prisma.bookmark.findMany({
                where,
                include: {
                    chapter: {
                        select: {
                            id: true,
                            title: true,
                            chapter_index: true,
                            comic: { select: { id: true, title: true, slug: true } },
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.bookmark.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async create(userId, dto) {
        return this.prisma.bookmark.create({
            data: {
                user_id: userId,
                chapter_id: BigInt(dto.chapter_id),
                page_number: dto.page_number,
            },
        });
    }
    async delete(userId, id) {
        const bookmark = await this.prisma.bookmark.findUnique({ where: { id } });
        if (!bookmark)
            throw new common_1.NotFoundException('Bookmark not found');
        if (bookmark.user_id !== userId)
            throw new common_1.ForbiddenException('Not your bookmark');
        await this.prisma.bookmark.delete({ where: { id } });
        return { success: true };
    }
};
exports.UserBookmarkService = UserBookmarkService;
exports.UserBookmarkService = UserBookmarkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserBookmarkService);
//# sourceMappingURL=bookmarks.service.js.map