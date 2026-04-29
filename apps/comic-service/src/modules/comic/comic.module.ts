import { Module } from '@nestjs/common';
import { AdminComicController } from './admin/controllers/comic.controller';
import { AdminComicService } from './admin/services/comic.service';
import { PublicComicController } from './public/controllers/comic.controller';
import { PublicComicService } from './public/services/comic.service';

@Module({
  controllers: [AdminComicController, PublicComicController],
  providers: [AdminComicService, PublicComicService],
  exports: [PublicComicService],
})
export class ComicModule {}
