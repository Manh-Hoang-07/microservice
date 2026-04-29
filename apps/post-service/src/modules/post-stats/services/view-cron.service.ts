import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisService } from '@package/redis';
import { PostStatsRepository } from '../repositories/post-stats.repository';

@Injectable()
export class ViewCronService {
  private readonly logger = new Logger(ViewCronService.name);

  constructor(
    private readonly postStatsRepo: PostStatsRepository,
    private readonly redis: RedisService,
  ) {}

  @Cron('0 */5 * * * *')
  async flushViewBuffer() {
    if (!this.redis.isEnabled()) return;

    const locked = await this.redis.setnx('post:views:buffer:lock', '1', 60);
    if (!locked) return;

    try {
      const buffer = await this.redis.hgetall('post:views:buffer');
      const entries = Object.entries(buffer);
      if (!entries.length) return;

      this.logger.log(`Flushing ${entries.length} post view counts`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const [postIdStr, countStr] of entries) {
        const postId = BigInt(postIdStr);
        const count = parseInt(countStr, 10);
        if (isNaN(count) || count <= 0) continue;

        try {
          await this.postStatsRepo.upsertStats(postId, count);
          await this.postStatsRepo.upsertDailyStats(postId, today, count);
          await this.redis.hdel('post:views:buffer', postIdStr);
        } catch (err) {
          this.logger.error(`Failed to flush views for post ${postIdStr}`, err);
        }
      }
    } catch (err) {
      this.logger.error('View buffer flush error', err);
    } finally {
      await this.redis.del('post:views:buffer:lock');
    }
  }
}
