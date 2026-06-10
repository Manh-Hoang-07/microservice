import { Module } from '@nestjs/common';
import { GroupChapterController } from './controllers/group-chapter.controller';
import { GroupChapterService } from './services/group-chapter.service';
import { IamClient } from '../../../clients/iam.client';
import { ChapterRepository } from '../repositories/chapter.repository';

@Module({
  controllers: [GroupChapterController],
  providers: [GroupChapterService, IamClient, ChapterRepository],
})
export class GroupChapterModule {}
