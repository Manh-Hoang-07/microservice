import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../../database/prisma.service';
import { PUBLIC_POST_STATUSES } from '../../../post/enums/post-status.enum';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CommentRepository } from '../../repositories/comment.repository';

const MAX_REPLY_DEPTH = 1;

@Injectable()
export class UserCommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async create(userId: any, dto: CreateCommentDto) {
    const postId = toPrimaryKey(dto.post_id);
    const uid = toPrimaryKey(userId);
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    // Verify the target post exists AND is in a publicly-visible state.
    // Without this, anyone can comment on draft/archived posts.
    const post = await this.prisma.post.findFirst({
      where: { id: postId, status: { in: PUBLIC_POST_STATUSES } },
      select: { id: true, status: true },
    });
    if (!post) throw new NotFoundException('Post not found');

    let parent: Awaited<ReturnType<CommentRepository['findById']>> | null = null;
    if (dto.parent_id) {
      parent = await this.commentRepo.findById(dto.parent_id);
      if (!parent) throw new NotFoundException('Parent comment not found');
      if (parent.post_id !== postId) {
        throw new ForbiddenException('Parent comment belongs to a different post');
      }
      // Enforce one-level threading: nested replies past depth 1 become
      // invisible to the renderer, so just refuse them at write time.
      if ((parent as any).parent_id != null) {
        throw new BadRequestException(`Reply depth exceeds ${MAX_REPLY_DEPTH}`);
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          // Authenticated user — strip guest_name/guest_email regardless of
          // DTO contents so an authenticated user cannot pose as a guest.
          user_id: uid,
          post_id: postId,
          parent_id: dto.parent_id ? toPrimaryKey(dto.parent_id) : null,
          content: dto.content,
        },
      });

      if (kafkaEnabled && parent && parent.user_id !== uid) {
        await tx.outbox.create({
          data: {
            event_type: 'post.comment.created',
            payload: {
              // Stringify BigInt — Number() corrupts ids > 2^53.
              comment_id: String(comment.id),
              post_id: String(comment.post_id),
              user_id: String(uid),
              parent_comment_id: String(dto.parent_id),
              parent_comment_user_id: parent.user_id ? String(parent.user_id) : null,
            },
          },
        });
      }

      return comment;
    });
  }

  async update(userId: any, id: any, content: string) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== toPrimaryKey(userId)) {
      throw new ForbiddenException('Not your comment');
    }
    return this.commentRepo.update(id, { content });
  }

  async delete(userId: any, id: any) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== toPrimaryKey(userId)) {
      throw new ForbiddenException('Not your comment');
    }
    await this.commentRepo.delete(id);
    return { success: true };
  }
}
