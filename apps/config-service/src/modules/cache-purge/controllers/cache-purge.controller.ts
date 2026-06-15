import { Controller, Get, HttpCode, HttpStatus, Optional, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Internal, InternalGuard } from '@package/common';
import { RedisService } from '@package/redis';

@Controller('cache')
export class CachePurgeController {
  constructor(@Optional() private readonly redis?: RedisService) {}

  // flushDb() wipes the ENTIRE Redis DB — must never be anonymous/public.
  // Restricted to internal service-to-service calls (x-internal-secret).
  @Internal()
  @UseGuards(InternalGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Get('flush')
  @HttpCode(HttpStatus.OK)
  async flush() {
    if (!this.redis?.isEnabled()) {
      return { flushed: false, reason: 'redis_disabled' };
    }
    await this.redis.flushDb();
    return { flushed: true };
  }
}
