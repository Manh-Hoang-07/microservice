import { Module } from '@nestjs/common';
import { GroupComicController } from './controllers/group-comic.controller';
import { GroupComicService } from './services/group-comic.service';
import { IamClient } from '../../../clients/iam.client';
import { ComicRepository } from '../repositories/comic.repository';

@Module({
  controllers: [GroupComicController],
  providers: [GroupComicService, IamClient, ComicRepository],
})
export class GroupComicModule {}
