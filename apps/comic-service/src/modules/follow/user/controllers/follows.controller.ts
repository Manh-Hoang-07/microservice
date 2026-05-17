import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { Authenticated, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserFollowService } from '../services/follows.service';
import { ListFollowsQueryDto } from '../dtos/list-follows.query.dto';

@Controller('user')
export class UserFollowController {
  constructor(private readonly followService: UserFollowService) {}

  @Authenticated()
  @Get('follows')
  async getList(@Query() query: ListFollowsQueryDto) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.followService.getList(userId, query);
  }

  @Authenticated()
  @Post('comics/:id/follow')
  async follow(@Param('id') id: string) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.followService.follow(userId, toPrimaryKey(id));
  }

  @Authenticated()
  @Delete('comics/:id/follow')
  async unfollow(@Param('id') id: string) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.followService.unfollow(userId, toPrimaryKey(id));
  }
}
