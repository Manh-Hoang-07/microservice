import { Global, Module } from '@nestjs/common';
import { GatewayCacheService } from './cache.service';

@Global()
@Module({
  providers: [GatewayCacheService],
  exports: [GatewayCacheService],
})
export class CacheModule {}
