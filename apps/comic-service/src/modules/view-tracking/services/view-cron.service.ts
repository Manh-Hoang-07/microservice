import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { randomUUID } from 'node:crypto';
import { RedisService } from '@package/redis';
import { ViewTrackingRepository } from '../repositories/view-tracking.repository';

const LOCK_KEY = 'comic:views:buffer:lock';
const LOCK_TTL_SECONDS = 60;

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

    // Unique token + Lua compare-and-delete release: if a flush overruns the
    // lock TTL and a second instance acquires the lock, this instance's
    // releaseLock won't delete the new holder's lock (token mismatch). The
    // previous `setnx`+`del` could delete another instance's lock.
    const lockToken = randomUUID();
    const locked = await this.redis.acquireLock(LOCK_KEY, lockToken, LOCK_TTL_SECONDS);
    if (!locked) return;

    try {
      // Atomic snapshot-then-clear: rename the live buffer to a temp key
      // BEFORE reading. The previous flow read the live key, upserted, then
      // HDEL each entry — meaning every increment arriving DURING the
      // flush was silently deleted with the entry, double-counting on a
      // crash and losing counts on a clean run. RENAME is atomic; if the
      // source key didn't exist the call throws, swallowed as "no buffer".
      const snapshotKey = `comic:views:buffer:flush:${Date.now()}`;
      try {
        await this.redis.rename('comic:views:buffer', snapshotKey);
      } catch {
        // No buffer to flush.
        return;
      }

      const buffer = await this.redis.hgetall(snapshotKey);
      const entries = Object.entries(buffer);
      if (!entries.length) {
        await this.redis.del(snapshotKey);
        return;
      }

      this.logger.log(`Flushing ${entries.length} comic view counts`);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Pre-validate entries so we can batch cleanly
      const validEntries: Array<{ comicIdStr: string; comicId: bigint; count: number }> = [];
      for (const [comicIdStr, countStr] of entries) {
        let comicId: bigint;
        try {
          comicId = BigInt(comicIdStr);
        } catch {
          this.logger.warn(`Skipping invalid comic id in view buffer: ${comicIdStr}`);
          continue;
        }
        const count = parseInt(countStr, 10);
        if (isNaN(count) || count <= 0) continue;
        validEntries.push({ comicIdStr, comicId, count });
      }

      const BATCH_SIZE = 20;
      for (let i = 0; i < validEntries.length; i += BATCH_SIZE) {
        const batch = validEntries.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map(async ({ comicIdStr, comicId, count }) => {
            try {
              // upsertStats (stats table) and upsertDailyStats (dailyStats
              // table) touch independent rows in independent tables, so they
              // run concurrently rather than sequentially. Both are idempotent
              // `increment` upserts; on any failure the whole count is restored
              // to the live buffer for the next tick to retry.
              await Promise.all([
                this.viewRepo.upsertStats(comicId, count),
                this.viewRepo.upsertDailyStats(comicId, today, count),
              ]);
            } catch (err: any) {
              // On failure, restore the unflushed entries to the live buffer
              // so the next tick retries instead of losing the count forever.
              this.logger.error(`Failed to flush views for comic ${comicIdStr}`, err);
              await this.redis
                .hincrby('comic:views:buffer', comicIdStr, count)
                .catch(() => undefined);
            }
          }),
        );
      }

      await this.redis.del(snapshotKey);
    } catch (err: any) {
      this.logger.error('View buffer flush error', err);
    } finally {
      await this.redis.releaseLock(LOCK_KEY, lockToken);
    }
  }
}
