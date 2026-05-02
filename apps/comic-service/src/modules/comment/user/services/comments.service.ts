import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { toPrimaryKey } from 'src/types';
import { PrismaService } from '../../../../database/prisma.service';
import { PUBLIC_COMIC_STATUSES } from '../../../comic/enums/comic-status.enum';
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
    const comicId = toPrimaryKey(dto.comic_id);
    const uid = toPrimaryKey(userId);
    const chapterId = dto.chapter_id ? toPrimaryKey(dto.chapter_id) : null;

    // Refuse to comment on a draft/scheduled comic. Without this check, any
    // authenticated user could post comments on unpublished work.
    const comic = await this.prisma.comic.findFirst({
      where: { id: comicId, status: { in: PUBLIC_COMIC_STATUSES } },
      select: { id: true },
    });
    if (!comic) throw new NotFoundException('Comic not found');

    if (chapterId) {
      // Chapter must belong to the same comic AND be published.
      const chapter = await this.prisma.chapter.findFirst({
        where: { id: chapterId, comic_id: comicId, status: 'published' },
        select: { id: true },
      });
      if (!chapter) {
        throw new BadRequestException('Chapter does not belong to this comic or is not published');
      }
    }

    let parent: Awaited<ReturnType<CommentRepository['findById']>> | null = null;
    if (dto.parent_id) {
      parent = await this.commentRepo.findById(dto.parent_id);
      if (!parent) throw new NotFoundException('Parent comment not found');
      if (parent.comic_id !== comicId) {
        throw new ForbiddenException('Parent comment belongs to a different comic');
      }
      // One-level threading: nested replies past depth 1 become invisible
      // because the public view only loads first-level replies.
      if ((parent as any).parent_id != null) {
        throw new BadRequestException(`Reply depth exceeds ${MAX_REPLY_DEPTH}`);
      }
    }

    const kafkaEnabled = !!this.config.get<boolean>('kafka.enabled');

    return this.prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          user_id: uid,
          comic_id: comicId,
          chapter_id: chapterId,
          parent_id: dto.parent_id ? toPrimaryKey(dto.parent_id) : null,
          content: dto.content,
        },
      });

      if (kafkaEnabled && parent && parent.user_id !== uid) {
        await tx.outbox.create({
          data: {
            event_type: 'comic.comment.created',
            payload: {
              // Stringify BigInt — Number() corrupts ids > 2^53.
              comment_id: String(comment.id),
              comic_id: String(comment.comic_id),
              chapter_id: comment.chapter_id ? String(comment.chapter_id) : null,
              user_id: String(uid),
              parent_comment_id: String(dto.parent_id),
              parent_comment_user_id: String(parent.user_id),
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
    if (comment.user_id !== toPrimaryKey(userId)) throw new ForbiddenException('Not your comment');
    return this.commentRepo.update(id, { content });
  }

  async delete(userId: any, id: any) {
    const comment = await this.commentRepo.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.user_id !== toPrimaryKey(userId)) throw new ForbiddenException('Not your comment');
    // Soft-delete via status to preserve thread context (replies still
    // resolve their parent without becoming orphans).
    return this.commentRepo.update(id, { status: 'deleted' });
  }
}
