import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { toPrimaryKey } from 'src/types';
import { PUBLIC_POST_STATUSES } from '../../../post/enums/post-status.enum';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CommentRepository } from '../../repositories/comment.repository';

const MAX_REPLY_DEPTH = 1;

@Injectable()
export class UserCommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly config: ConfigService,
  ) {}

  async create(userId: any, dto: CreateCommentDto) {
    const postId = toPrimaryKey(dto.post_id);
    const uid = toPrimaryKey(userId);
    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    // Verify the target post exists AND is in a publicly-visible state.
    // Without this, anyone can comment on draft/archived posts.
    const post = await this.commentRepo.existsPublicPost(postId, PUBLIC_POST_STATUSES);
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

    const commentData = {
      // Authenticated user — strip guest_name/guest_email regardless of
      // DTO contents so an authenticated user cannot pose as a guest.
      user_id: uid,
      post_id: postId,
      parent_id: dto.parent_id ? toPrimaryKey(dto.parent_id) : null,
      content: dto.content,
    };

    const needsOutbox = kafkaEnabled && parent && parent.user_id !== uid;

    return this.commentRepo.withTransaction(async (tx) => {
      const comment = await this.commentRepo.create(commentData, tx);

      if (needsOutbox) {
        await this.commentRepo.createOutbox(
          'post.comment.created',
          {
            comment_id: String(comment.id),
            post_id: String(comment.post_id),
            user_id: String(uid),
            parent_comment_id: String(dto.parent_id),
            parent_comment_user_id: parent!.user_id ? String(parent!.user_id) : null,
          },
          tx,
        );
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
