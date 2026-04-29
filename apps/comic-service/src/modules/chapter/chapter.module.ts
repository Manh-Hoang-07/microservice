import { Module } from '@nestjs/common';
import { AdminChapterController } from './admin/controllers/chapter.controller';
import { AdminChapterService } from './admin/services/chapter.service';
import { PublicChapterController } from './public/controllers/chapter.controller';
import { PublicChapterService } from './public/services/chapter.service';

@Module({
  controllers: [AdminChapterController, PublicChapterController],
  providers: [AdminChapterService, PublicChapterService],
  exports: [AdminChapterService],
})
export class ChapterModule {}
