import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { TokenBlacklistService } from './token-blacklist.service';
import { AttemptLimiterService } from './attempt-limiter.service';

@Global()
@Module({
  providers: [RedisService, TokenBlacklistService, AttemptLimiterService],
  exports: [RedisService, TokenBlacklistService, AttemptLimiterService],
})
export class SecurityModule {}
