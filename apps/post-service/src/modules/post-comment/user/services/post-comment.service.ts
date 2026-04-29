import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../database/prisma.service';
import { CreatePostCommentDto } from '../dtos/create-post-comment.dto';

@Injectable()
export class UserPostCommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(userId: bigint, dto: CreatePostCommentDto) {
    // Validate parent comment if provided
    if (dto.parent_id) {
      const parent = await this.prisma.postComment.findUnique({
        where: { id: BigInt(dto.parent_id) },
      });
      if (!parent) throw new NotFoundException('Parent comment not found');
      if (parent.post_id !== BigInt(dto.post_id)) {
        throw new ForbiddenException('Parent comment belongs to a different post');
      }
    }

    const comment = await this.prisma.postComment.create({
      data: {
        user_id: userId,
        post_id: BigInt(dto.post_id),
        parent_id: dto.parent_id ? BigInt(dto.parent_id) : null,
        guest_name: dto.guest_name,
        guest_email: dto.guest_email,
        content: dto.content,
      },
    });

    // Write to outbox for notification (comment reply)
    if (dto.parent_id && this.config.get<boolean>('kafka.enabled')) {
      const parent = await this.prisma.postComment.findUnique({
        where: { id: BigInt(dto.parent_id) },
      });
      // Don't notify self
      if (parent && parent.user_id !== userId) {
        await this.prisma.postOutbox.create({
          data: {
            event_type: 'post.comment.created',
            payload: {
              comment_id: Number(comment.id),
              post_id: Number(comment.post_id),
              user_id: Number(userId),
              parent_comment_id: Number(dto.parent_id),
              parent_comment_user_id: parent.user_id ? Number(parent.user_id) : null,
            },
          },
        });
      }
    }

    return comment;
  }

  async update(userId: bigint, id: bigint, content: string) {
    const comment = await this.prisma.postComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== userId) throw new ForbiddenException('Not your comment');
    return this.prisma.postComment.update({ where: { id }, data: { content } });
  }

  async delete(userId: bigint, id: bigint) {
    const comment = await this.prisma.postComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== userId) throw new ForbiddenException('Not your comment');
    await this.prisma.postComment.delete({ where: { id } });
    return { success: true };
  }
}
