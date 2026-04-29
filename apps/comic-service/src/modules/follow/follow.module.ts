import { Module } from '@nestjs/common';
import { UserFollowController } from './user/controllers/follows.controller';
import { UserFollowService } from './user/services/follows.service';
import { ComicFollowRepository } from './repositories/comic-follow.repository';

@Module({
  controllers: [UserFollowController],
  providers: [ComicFollowRepository, UserFollowService],
  exports: [ComicFollowRepository],
})
export class FollowModule {}
