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
      if (parent.comic_id !== toPrimaryKey(dto.comic_id)) {
        throw new ForbiddenException('Parent comment belongs to a different comic');
      }
    }

    const comment = await this.commentRepo.create({
      user_id: userId,
      comic_id: dto.comic_id,
      chapter_id: dto.chapter_id ?? null,
      parent_id: dto.parent_id ?? null,
      content: dto.content,
    });

    if (parent && parent.user_id !== toPrimaryKey(userId) && this.config.get<boolean>('kafka.enabled')) {
      await this.commentRepo.createOutbox('comic.comment.created', {
        comment_id: Number(comment.id),
        comic_id: Number(comment.comic_id),
        chapter_id: comment.chapter_id ? Number(comment.chapter_id) : null,
        user_id: Number(userId),
        parent_comment_id: Number(dto.parent_id),
        parent_comment_user_id: Number(parent.user_id),
      });
    }

    return comment;
  }

  async update(userId: any, id: any, content: string) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== toPrimaryKey(userId)) throw new ForbiddenException('Not your comment');
    return this.commentRepo.update(id, { content });
  }

  async delete(userId: any, id: any) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== toPrimaryKey(userId)) throw new ForbiddenException('Not your comment');
    await this.commentRepo.delete(id);
    return { success: true };
  }
}
