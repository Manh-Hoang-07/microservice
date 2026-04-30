import { Injectable } from '@nestjs/common';
import { AdminNotificationService } from '../../modules/notification/admin/services/notification.service';
import { FollowersProjectionRepository } from '../repositories/followers-projection.repository';
import { KafkaHandler } from './kafka-handler.interface';

@Injectable()
export class ChapterPublishedHandler implements KafkaHandler {
  constructor(
    private readonly followersProjectionRepo: FollowersProjectionRepository,
    private readonly notifService: AdminNotificationService,
  ) {}

  async handle(payload: any) {
    const { comic_id, comic_title, comic_slug, chapter_label } = payload;
    const followers = await this.followersProjectionRepo.findByComicId(BigInt(comic_id));
    if (!followers.length) return;

    const batchSize = 500;
    for (let i = 0; i < followers.length; i += batchSize) {
      const batch = followers.slice(i, i + batchSize);
      await this.notifService.createMany(
        batch.map((f) => ({
          user_id: f.user_id,
          title: `${comic_title} - ${chapter_label}`,
          message: `Chương mới đã được cập nhật: ${chapter_label}`,
          type: 'info',
          data: { comic_id, comic_slug, chapter_label },
        })),
      );
    }
  }
}
