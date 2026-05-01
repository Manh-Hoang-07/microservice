import { Global, Module } from '@nestjs/common';
import { TokenBlacklistService } from './services/token-blacklist.service';
import { AttemptLimiterService } from './services/attempt-limiter.service';

@Global()
@Module({
  providers: [TokenBlacklistService, AttemptLimiterService],
  exports: [TokenBlacklistService, AttemptLimiterService],
})
export class SecurityModule {}
