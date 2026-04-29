import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisService } from '@package/redis';
import { ViewTrackingRepository } from '../repositories/view-tracking.repository';

@Injectable()
export class ViewCronService {
  private readonly logger = new Logger(ViewCronService.name);

  constructor(
    private readonly viewRepo: ViewTrackingRepository,
    private readonly redis: RedisService,
  ) {}

  @Cron('0 */5 * * * *')
  async flushViewBuffer() {
    if (!this.redis.isEnabled()) return;

    const locked = await this.redis.setnx('comic:views:buffer:lock', '1', 60);
    if (!locked) return;

    try {
      const buffer = await this.redis.hgetall('comic:views:buffer');
      const entries = Object.entries(buffer);
      if (!entries.length) return;

      this.logger.log(`Flushing ${entries.length} comic view counts`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const [comicIdStr, countStr] of entries) {
        const comicId = BigInt(comicIdStr);
        const count = parseInt(countStr, 10);
        if (isNaN(count) || count <= 0) continue;

        try {
          await this.viewRepo.upsertStats(comicId, count);
          await this.viewRepo.upsertDailyStats(comicId, today, count);
          await this.redis.hdel('comic:views:buffer', comicIdStr);
        } catch (err) {
          this.logger.error(`Failed to flush views for comic ${comicIdStr}`, err);
        }
      }
    } catch (err) {
      this.logger.error('View buffer flush error', err);
    } finally {
      await this.redis.del('comic:views:buffer:lock');
    }
  }
}
