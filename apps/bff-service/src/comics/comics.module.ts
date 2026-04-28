import { Module } from '@nestjs/common';
import { BffComicsController } from './comics.controller';
import { BffComicsService } from './comics.service';
import { ComicClient } from '../clients/comic.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Module({
  controllers: [BffComicsController],
  providers: [BffComicsService, ComicClient, BffCacheService],
})
export class BffComicsModule {}
