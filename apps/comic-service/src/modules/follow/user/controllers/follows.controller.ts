import { Controller, Get, Post, Delete, Param, Query, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserFollowService } from '../services/follows.service';
import { ListFollowsQueryDto } from '../dtos/list-follows.query.dto';

@Controller('user')
export class UserFollowController {
  constructor(private readonly followService: UserFollowService) {}

  @Permission('user')
  @Get('follows')
  async getList(@Req() req: any, @Query() query: ListFollowsQueryDto) {
    const userId = toPrimaryKey(req.user.sub);
    return this.followService.getList(userId, query);
  }

  @Permission('user')
  @Post('comics/:id/follow')
  async follow(@Req() req: any, @Param('id') id: string) {
    const userId = toPrimaryKey(req.user.sub);
    return this.followService.follow(userId, toPrimaryKey(id));
  }

  @Permission('user')
  @Delete('comics/:id/follow')
  async unfollow(@Req() req: any, @Param('id') id: string) {
    const userId = toPrimaryKey(req.user.sub);
    return this.followService.unfollow(userId, toPrimaryKey(id));
  }
}
