import { Injectable, Inject } from '@nestjs/common';
import { NotificationType } from '@/shared/enums/types/notification-type.enum';
import {
  IFollowRepository,
  FOLLOW_REPOSITORY,
} from '../../follow/domain/follow.repository';
import {
  ICommentRepository,
  COMMENT_REPOSITORY,
} from '../../comment/domain/comment.repository';
import {
  INotificationRepository,
  NOTIFICATION_REPOSITORY,
} from '@/modules/system/notification/domain/notification.repository';
import { toPrimaryKey } from '@/common/core/repositories/prisma-query.helper';
import { KafkaService } from '@/kafka/kafka.service';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { KafkaTopic } from '@/kafka/kafka.constants';

@Injectable()
export class ComicNotificationService {
  constructor(
    @Inject(FOLLOW_REPOSITORY)
    private readonly followRepository: IFollowRepository,
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: ICommentRepository,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: INotificationRepository,
    private readonly kafka: KafkaService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Notify followers khi có chapter mới được publish.
   * Khi EVENT_DRIVER=kafka: ghi vào comic_outbox (transactional outbox).
   * Khi local: ghi DB trực tiếp như cũ.
   */
  async notifyNewChapter(chapter: any) {
    if (!chapter.comic_id) return;

    if (this.kafka.enabled) {
      await this.publishChapterEventToOutbox(chapter);
      return;
    }

    await this.notifyNewChapterDirect(chapter);
  }

  /**
   * Notify user khi có comment reply.
   * Khi EVENT_DRIVER=kafka: publish Kafka event.
   * Khi local: ghi DB trực tiếp như cũ.
   */
  async notifyCommentReply(commentId: any, parentCommentId: any, userId: any) {
    if (this.kafka.enabled) {
      await this.kafka.publish({
        topic: KafkaTopic.COMMENT_CREATED,
        key: String(commentId),
        value: {
          comment_id: String(commentId),
          parent_comment_id: String(parentCommentId),
          user_id: String(userId),
          chapter_id: null,
        },
      });
      return;
    }

    return this.notifyCommentReplyDirect(commentId, parentCommentId, userId);
  }

  // ── Private: Kafka path ───────────────────────────────────────────────────

  private async publishChapterEventToOutbox(chapter: any) {
    const comicId = toPrimaryKey(chapter.comic_id);

    const followers = await this.followRepository.findMany(
      { comic_id: comicId },
      { include: { comic: true } } as any,
    );

    if (followers.length === 0) return;

    const comic = (followers[0] as any).comic;
    if (!comic) return;

    await this.prisma.comicOutbox.create({
      data: {
        event_type: KafkaTopic.CHAPTER_PUBLISHED,
        payload: {
          comic_id: String(comicId),
          chapter_id: String(toPrimaryKey(chapter.id)),
          comic_title: comic.title,
          chapter_label: chapter.chapter_label ?? String(chapter.chapter_index),
          published_at: new Date().toISOString(),
        },
      },
    });
  }

  // ── Private: Direct DB path (legacy) ──────────────────────────────────────

  private async notifyNewChapterDirect(chapter: any) {
    const comicId = toPrimaryKey(chapter.comic_id);

    const followers = await this.followRepository.findMany(
      { comic_id: comicId },
      { include: { comic: true } } as any,
    );

    if (followers.length === 0) return;

    const comic = (followers[0] as any).comic;
    if (!comic) return;

    const notifications = followers.map((follow: any) =>
      this.notificationRepository.create({
        user_id: toPrimaryKey(follow.user_id),
        title: `Chapter mới: ${chapter.title}`,
        message: `${comic.title} đã có chapter mới: ${chapter.chapter_label || chapter.chapter_index}`,
        type: NotificationType.info as any,
        data: {
          comic_id: toPrimaryKey(comic.id),
          comic_slug: comic.slug,
          comic_title: comic.title,
          chapter_id: toPrimaryKey(chapter.id),
          chapter_index: chapter.chapter_index,
          chapter_label: chapter.chapter_label,
        } as any,
        is_read: false,
      } as any),
    );

    await Promise.all(notifications);
    return { notified: notifications.length };
  }

  private async notifyCommentReplyDirect(
    commentId: any,
    parentCommentId: any,
    userId: any,
  ) {
    const parentComment =
      await this.commentRepository.findById(parentCommentId);

    if (!parentComment || String(parentComment.user_id) === String(userId)) {
      return;
    }

    return this.notificationRepository.create({
      user_id: parentComment.user_id,
      title: 'Có người trả lời bình luận của bạn',
      message: 'Bạn có một phản hồi mới cho bình luận của bạn',
      type: NotificationType.info as any,
      data: {
        comment_id: commentId,
        parent_comment_id: parentCommentId,
      } as any,
      is_read: false,
    } as any);
  }
}
