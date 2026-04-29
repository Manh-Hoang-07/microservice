import { Module } from '@nestjs/common';
import { BffPostsController } from './controllers/posts.controller';
import { BffPostsService } from './services/posts.service';
import { MainClient } from '../clients/main.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Module({
  controllers: [BffPostsController],
  providers: [BffPostsService, MainClient, BffCacheService],
})
export class BffPostsModule {}
