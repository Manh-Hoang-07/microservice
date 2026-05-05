import { Controller, Get, HttpCode, HttpStatus, Optional } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '@package/common';
import { RedisService } from '@package/redis';

@Controller()
export class CachePurgeController {
  constructor(@Optional() private readonly redis?: RedisService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Get('cache/flush')
  @HttpCode(HttpStatus.OK)
  async flush() {
    if (!this.redis?.isEnabled()) {
      return { flushed: false, reason: 'redis_disabled' };
    }
    await this.redis.flushDb();
    return { flushed: true };
  }
}
