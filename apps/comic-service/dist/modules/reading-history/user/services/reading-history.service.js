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
exports.UserReadingHistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../database/prisma.service");
const common_2 = require("@package/common");
let UserReadingHistoryService = class UserReadingHistoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(userId, query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;
        const where = { user_id: userId };
        const [data, total] = await Promise.all([
            this.prisma.readingHistory.findMany({
                where,
                include: {
                    comic: { select: { id: true, title: true, slug: true, cover_image: true } },
                    chapter: { select: { id: true, title: true, chapter_index: true, chapter_label: true } },
                },
                orderBy: { updated_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.readingHistory.count({ where }),
        ]);
        return { data, meta: (0, common_2.createPaginationMeta)(page, limit, total) };
    }
    async upsert(userId, comicId, chapterId) {
        return this.prisma.readingHistory.upsert({
            where: { user_id_comic_id: { user_id: userId, comic_id: comicId } },
            create: { user_id: userId, comic_id: comicId, chapter_id: chapterId },
            update: { chapter_id: chapterId },
        });
    }
    async clear(userId, comicId) {
        await this.prisma.readingHistory.deleteMany({
            where: { user_id: userId, comic_id: comicId },
        });
        return { success: true };
    }
};
exports.UserReadingHistoryService = UserReadingHistoryService;
exports.UserReadingHistoryService = UserReadingHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserReadingHistoryService);
//# sourceMappingURL=reading-history.service.js.map