import { Injectable, Logger } from '@nestjs/common';
import { AdminNotificationService } from '../../modules/notification/admin/services/notification.service';
import { FollowersProjectionRepository } from '../repositories/followers-projection.repository';
import { KafkaHandler } from './kafka-handler.interface';

const NUMERIC_RE = /^\d{1,20}$/;

@Injectable()
export class ChapterPublishedHandler implements KafkaHandler {
  private readonly logger = new Logger(ChapterPublishedHandler.name);

  constructor(
    private readonly followersProjectionRepo: FollowersProjectionRepository,
    private readonly notifService: AdminNotificationService,
  ) {}

  async handle(payload: any) {
    const { comic_id, comic_title, comic_slug, chapter_label } = payload ?? {};

    // Validate up-front. A malformed comic_id used to throw SyntaxError
    // from `BigInt(...)`, taking down the whole consumer batch.
    if (!comic_id || !NUMERIC_RE.test(String(comic_id))) {
      this.logger.warn(`chapter.published: invalid comic_id "${comic_id}", skipping`);
      return;
    }
    if (typeof comic_title !== 'string' || typeof chapter_label !== 'string') {
      this.logger.warn('chapter.published: missing title or chapter_label, skipping');
      return;
    }

    const followers = await this.followersProjectionRepo.findByComicId(BigInt(comic_id));
    if (!followers.length) return;

    // TODO: This sequential fan-out is the biggest consumer throughput bottleneck.
    // Move chapter.published processing to a dedicated consumer group so it
    // doesn't block other notification handlers while iterating large follower lists.
    const batchSize = 500;
    let failedBatches = 0;
    for (let i = 0; i < followers.length; i += batchSize) {
      const batch = followers.slice(i, i + batchSize);
      try {
        await this.notifService.createMany(
          batch.map((f) => ({
            user_id: f.user_id,
            title: `${comic_title} - ${chapter_label}`,
            message: `Chương mới đã được cập nhật: ${chapter_label}`,
            type: 'info',
            data: { comic_id: String(comic_id), comic_slug, chapter_label },
          })),
        );
      } catch (err) {
        // Don't abort the entire fan-out on a transient batch failure;
        // log and continue so the remaining followers still get notified.
        failedBatches++;
        this.logger.error(
          `chapter.published batch ${i}-${i + batch.length} failed: ${(err as Error).message}`,
          (err as Error).stack,
        );
      }
    }
    if (failedBatches > 0) {
      // Surface partial failure so KafkaService can re-deliver the message.
      throw new Error(
        `chapter.published: ${failedBatches} batch(es) failed for comic ${comic_id}`,
      );
    }
  }
}
