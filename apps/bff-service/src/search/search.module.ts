import { Module } from '@nestjs/common';
import { BffSearchController } from './controllers/search.controller';
import { BffSearchService } from './services/search.service';
import { ComicClient } from '../clients/comic.client';
import { MainClient } from '../clients/main.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Module({
  controllers: [BffSearchController],
  providers: [BffSearchService, ComicClient, MainClient, BffCacheService],
})
export class BffSearchModule {}
