import { Module } from '@nestjs/common';
import { BffHealthController } from './health.controller';
import { BffCacheService } from '../cache/bff-cache.service';

@Module({
  controllers: [BffHealthController],
  providers: [BffCacheService],
})
export class BffHealthModule {}
