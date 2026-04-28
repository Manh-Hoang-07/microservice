import { Module } from '@nestjs/common';
import { BffSearchController } from './search.controller';
import { BffSearchService } from './search.service';
import { ComicClient } from '../clients/comic.client';
import { MainClient } from '../clients/main.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Module({
  controllers: [BffSearchController],
  providers: [BffSearchService, ComicClient, MainClient, BffCacheService],
})
export class BffSearchModule {}
