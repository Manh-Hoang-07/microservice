import { Module } from '@nestjs/common';
import { CachePurgeController } from './controllers/cache-purge.controller';

@Module({
  controllers: [CachePurgeController],
})
export class CachePurgeModule {}
