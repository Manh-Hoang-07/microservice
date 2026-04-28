import { Module } from '@nestjs/common';
import { HomepageController } from './homepage.controller';
import { BffHomepageService } from './homepage.service';
import { ComicClient } from '../clients/comic.client';
import { MainClient } from '../clients/main.client';
import { BffCacheService } from '../cache/bff-cache.service';

@Module({
  controllers: [HomepageController],
  providers: [BffHomepageService, ComicClient, MainClient, BffCacheService],
})
export class BffHomepageModule {}
