import { Global, Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { TokenBlacklistService } from './services/token-blacklist.service';
import { AttemptLimiterService } from './services/attempt-limiter.service';

@Global()
@Module({
  providers: [RedisService, TokenBlacklistService, AttemptLimiterService],
  exports: [RedisService, TokenBlacklistService, AttemptLimiterService],
})
export class SecurityModule {}
