import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '@package/redis';

@Injectable()
export class ViewCronService {
  private readonly logger = new Logger(ViewCronService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  /**
   * Every 5 minutes: flush Redis view buffer to post_stats + post_daily_stats
   */
  @Cron('0 */5 * * * *')
  async flushViewBuffer() {
    if (!this.redis.isEnabled()) return;

    // Acquire lock
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
          // Update lifetime stats
          await this.prisma.postStats.upsert({
            where: { post_id: postId },
            create: { post_id: postId, view_count: BigInt(count) },
            update: { view_count: { increment: BigInt(count) } },
          });

          // Update daily stats
          await this.prisma.postDailyStats.upsert({
            where: { post_id_stat_date: { post_id: postId, stat_date: today } },
            create: { post_id: postId, stat_date: today, view_count: BigInt(count) },
            update: { view_count: { increment: BigInt(count) } },
          });

          // Remove from buffer
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
