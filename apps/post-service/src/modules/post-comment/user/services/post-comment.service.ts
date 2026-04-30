import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { toPrimaryKey, PrimaryKey } from 'src/types';
import { CreatePostCommentDto } from '../dtos/create-post-comment.dto';
import { PostCommentRepository } from '../../repositories/post-comment.repository';

@Injectable()
export class UserPostCommentService {
  constructor(
    private readonly commentRepo: PostCommentRepository,
    private readonly config: ConfigService,
  ) {}

  async create(userId: PrimaryKey, dto: CreatePostCommentDto) {
    if (dto.parent_id) {
      const parent = await this.commentRepo.findById(toPrimaryKey(dto.parent_id));
      if (!parent) throw new NotFoundException('Parent comment not found');
      if (parent.post_id !== toPrimaryKey(dto.post_id)) {
        throw new ForbiddenException('Parent comment belongs to a different post');
      }
    }

    const comment = await this.commentRepo.create({
      user_id: userId,
      post_id: toPrimaryKey(dto.post_id),
      parent_id: dto.parent_id ? toPrimaryKey(dto.parent_id) : null,
      guest_name: dto.guest_name,
      guest_email: dto.guest_email,
      content: dto.content,
    });

    if (dto.parent_id && this.config.get<boolean>('kafka.enabled')) {
      const parent = await this.commentRepo.findById(toPrimaryKey(dto.parent_id));
      if (parent && parent.user_id !== userId) {
        await this.commentRepo.createOutbox({
          event_type: 'post.comment.created',
          payload: {
            comment_id: Number(comment.id),
            post_id: Number(comment.post_id),
            user_id: Number(userId),
            parent_comment_id: Number(dto.parent_id),
            parent_comment_user_id: parent.user_id ? Number(parent.user_id) : null,
          },
        });
      }
    }

    return comment;
  }

  async update(userId: PrimaryKey, id: PrimaryKey, content: string) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== userId) throw new ForbiddenException('Not your comment');
    return this.commentRepo.update(id, { content });
  }

  async delete(userId: PrimaryKey, id: PrimaryKey) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== userId) throw new ForbiddenException('Not your comment');
    await this.commentRepo.delete(id);
    return { success: true };
  }
}
