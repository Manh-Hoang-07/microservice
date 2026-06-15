import { Injectable } from '@nestjs/common';
import { AdminNotificationService } from '../../../modules/notification/admin/services/notification.service';
import { FollowersProjectionRepository } from '../../../modules/notification/repositories/followers-projection.repository';
import { KafkaHandler } from '../interfaces/kafka-handler.interface';

const NUMERIC_RE = /^\d{1,20}$/;
const BATCH_SIZE = 500;
/**
 * Max batches sent to the DB concurrently. Fanout is order-independent (each row
 * is a standalone notification), so we trade strict sequencing for throughput.
 * Kept low (4) to bound connection-pool pressure while still parallelising.
 */
const BATCH_CONCURRENCY = 4;

@Injectable()
export class ChapterPublishedHandler implements KafkaHandler {
  constructor(
    private readonly followersProjectionRepo: FollowersProjectionRepository,
    private readonly notifService: AdminNotificationService,
  ) {}

  async handle(payload: any) {
    const { comic_id, comic_title, comic_slug, chapter_label } = payload ?? {};

    if (!comic_id || !NUMERIC_RE.test(String(comic_id))) return;
    if (typeof comic_title !== 'string' || typeof chapter_label !== 'string') return;

    const followers = await this.followersProjectionRepo.findByComicId(BigInt(comic_id));
    if (!followers.length) return;

    // Split followers into 500-sized batches up front. createMany() is idempotent
    // (skipDuplicates), so re-processing the same event is safe.
    const batches: Array<ReturnType<typeof this.buildBatch>> = [];
    for (let i = 0; i < followers.length; i += BATCH_SIZE) {
      batches.push(
        this.buildBatch(followers.slice(i, i + BATCH_SIZE), { comic_id, comic_title, comic_slug, chapter_label }),
      );
    }

    // Run batches with bounded concurrency instead of fully sequentially so a large
    // follower set (e.g. 50k = 100 batches) does not block the consumer for long.
    let failedBatches = 0;
    let next = 0;
    const worker = async () => {
      while (next < batches.length) {
        const batch = batches[next++];
        try {
          await this.notifService.createMany(batch);
        } catch {
          failedBatches++;
        }
      }
    };
    const workerCount = Math.min(BATCH_CONCURRENCY, batches.length);
    await Promise.all(Array.from({ length: workerCount }, () => worker()));

    if (failedBatches > 0) {
      throw new Error(
        `chapter.published: ${failedBatches} batch(es) failed for comic ${comic_id}`,
      );
    }
  }

  private buildBatch(
    followers: Array<{ userId: bigint }>,
    ctx: { comic_id: any; comic_title: string; comic_slug: any; chapter_label: string },
  ) {
    return followers.map((f) => ({
      userId: f.userId,
      title: `${ctx.comic_title} - ${ctx.chapter_label}`,
      message: `Chương mới đã được cập nhật: ${ctx.chapter_label}`,
      type: 'info',
      data: { comic_id: String(ctx.comic_id), comic_slug: ctx.comic_slug, chapter_label: ctx.chapter_label },
    }));
  }
}
