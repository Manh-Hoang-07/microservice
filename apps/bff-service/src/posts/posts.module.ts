import { Module } from '@nestjs/common';
import { BffPostsController } from './posts.controller';
import { BffPostsService } from './posts.service';
import { MainClient } from '../clients/main.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Module({
  controllers: [BffPostsController],
  providers: [BffPostsService, MainClient, BffCacheService],
})
export class BffPostsModule {}
