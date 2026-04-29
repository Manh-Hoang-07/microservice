import { Module } from '@nestjs/common';
import { UserFollowController } from './user/controllers/follows.controller';
import { UserFollowService } from './user/services/follows.service';

@Module({
  controllers: [UserFollowController],
  providers: [UserFollowService],
})
export class FollowModule {}
