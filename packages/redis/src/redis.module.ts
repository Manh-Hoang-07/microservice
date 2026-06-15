import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheVersionService } from './cache-version.service';

@Global()
@Module({
  providers: [RedisService, CacheVersionService],
  exports: [RedisService, CacheVersionService],
})
export class RedisModule {}
