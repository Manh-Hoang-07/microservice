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
exports.UserCommentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../../database/prisma.service");
let UserCommentService = class UserCommentService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async create(userId, dto) {
        if (dto.parent_id) {
            const parent = await this.prisma.comicComment.findUnique({
                where: { id: BigInt(dto.parent_id) },
            });
            if (!parent)
                throw new common_1.NotFoundException('Parent comment not found');
            if (parent.comic_id !== BigInt(dto.comic_id)) {
                throw new common_1.ForbiddenException('Parent comment belongs to a different comic');
            }
        }
        const comment = await this.prisma.comicComment.create({
            data: {
                user_id: userId,
                comic_id: BigInt(dto.comic_id),
                chapter_id: dto.chapter_id ? BigInt(dto.chapter_id) : null,
                parent_id: dto.parent_id ? BigInt(dto.parent_id) : null,
                content: dto.content,
            },
        });
        if (dto.parent_id && this.config.get('kafka.enabled')) {
            const parent = await this.prisma.comicComment.findUnique({
                where: { id: BigInt(dto.parent_id) },
            });
            if (parent && parent.user_id !== userId) {
                await this.prisma.comicOutbox.create({
                    data: {
                        event_type: 'comic.comment.created',
                        payload: {
                            comment_id: Number(comment.id),
                            comic_id: Number(comment.comic_id),
                            chapter_id: comment.chapter_id ? Number(comment.chapter_id) : null,
                            user_id: Number(userId),
                            parent_comment_id: Number(dto.parent_id),
                            parent_comment_user_id: Number(parent.user_id),
                        },
                    },
                });
            }
        }
        return comment;
    }
    async update(userId, id, content) {
        const comment = await this.prisma.comicComment.findUnique({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        if (comment.user_id !== userId)
            throw new common_1.ForbiddenException('Not your comment');
        return this.prisma.comicComment.update({ where: { id }, data: { content } });
    }
    async delete(userId, id) {
        const comment = await this.prisma.comicComment.findUnique({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        if (comment.user_id !== userId)
            throw new common_1.ForbiddenException('Not your comment');
        await this.prisma.comicComment.delete({ where: { id } });
        return { success: true };
    }
};
exports.UserCommentService = UserCommentService;
exports.UserCommentService = UserCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UserCommentService);
//# sourceMappingURL=comments.service.js.map