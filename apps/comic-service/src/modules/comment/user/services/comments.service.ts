import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Injectable()
export class UserCommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(userId: bigint, dto: CreateCommentDto) {
    // Validate parent comment if provided
    if (dto.parent_id) {
      const parent = await this.prisma.comicComment.findUnique({
        where: { id: BigInt(dto.parent_id) },
      });
      if (!parent) throw new NotFoundException('Parent comment not found');
      if (parent.comic_id !== BigInt(dto.comic_id)) {
        throw new ForbiddenException('Parent comment belongs to a different comic');
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

    // Write to outbox for notification (comment reply)
    if (dto.parent_id && this.config.get<boolean>('kafka.enabled')) {
      const parent = await this.prisma.comicComment.findUnique({
        where: { id: BigInt(dto.parent_id) },
      });
      // Don't notify self
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

  async update(userId: bigint, id: bigint, content: string) {
    const comment = await this.prisma.comicComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== userId) throw new ForbiddenException('Not your comment');
    return this.prisma.comicComment.update({ where: { id }, data: { content } });
  }

  async delete(userId: bigint, id: bigint) {
    const comment = await this.prisma.comicComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== userId) throw new ForbiddenException('Not your comment');
    await this.prisma.comicComment.delete({ where: { id } });
    return { success: true };
  }
}
