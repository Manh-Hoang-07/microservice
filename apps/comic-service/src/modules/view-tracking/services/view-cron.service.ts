import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../../database/prisma.service';
import { RedisService } from '../../../redis/redis.service';

@Injectable()
export class ViewCronService {
  private readonly logger = new Logger(ViewCronService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  /**
   * Every 5 minutes: flush Redis view buffer to comic_stats + comic_daily_stats
   */
  @Cron('0 */5 * * * *')
  async flushViewBuffer() {
    if (!this.redis.isEnabled()) return;

    // Acquire lock
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
          // Update lifetime stats
          await this.prisma.comicStats.upsert({
            where: { comic_id: comicId },
            create: { comic_id: comicId, view_count: BigInt(count) },
            update: { view_count: { increment: BigInt(count) } },
          });

          // Update daily stats
          await this.prisma.comicDailyStats.upsert({
            where: { comic_id_stat_date: { comic_id: comicId, stat_date: today } },
            create: { comic_id: comicId, stat_date: today, view_count: BigInt(count) },
            update: { view_count: { increment: BigInt(count) } },
          });

          // Remove from buffer
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
