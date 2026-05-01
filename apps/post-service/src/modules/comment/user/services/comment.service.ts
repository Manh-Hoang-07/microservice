import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { toPrimaryKey } from 'src/types';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { CommentRepository } from '../../repositories/comment.repository';

@Injectable()
export class UserCommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly config: ConfigService,
  ) {}

  async create(userId: any, dto: CreateCommentDto) {
    let parent: Awaited<ReturnType<CommentRepository['findById']>> | null = null;
    if (dto.parent_id) {
      parent = await this.commentRepo.findById(dto.parent_id);
      if (!parent) throw new NotFoundException('Parent comment not found');
      if (parent.post_id !== toPrimaryKey(dto.post_id)) {
        throw new ForbiddenException('Parent comment belongs to a different post');
      }
    }

    const comment = await this.commentRepo.create({
      user_id: userId,
      post_id: dto.post_id,
      parent_id: dto.parent_id ?? null,
      guest_name: dto.guest_name,
      guest_email: dto.guest_email,
      content: dto.content,
    });

    if (parent && parent.user_id !== toPrimaryKey(userId) && this.config.get<boolean>('kafka.enabled')) {
      await this.commentRepo.createOutbox('post.comment.created', {
        comment_id: Number(comment.id),
        post_id: Number(comment.post_id),
        user_id: Number(userId),
        parent_comment_id: Number(dto.parent_id),
        parent_comment_user_id: parent.user_id ? Number(parent.user_id) : null,
      });
    }

    return comment;
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
