import { Module } from '@nestjs/common';
import { UserFollowController } from './user/controllers/follows.controller';
import { UserFollowService } from './user/services/follows.service';
import { FollowRepository } from './repositories/follow.repository';

@Module({
  controllers: [UserFollowController],
  providers: [FollowRepository, UserFollowService],
  exports: [FollowRepository],
})
export class FollowModule {}
