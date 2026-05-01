import { Controller, Get, Post, Delete, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { UserFollowService } from '../services/follows.service';

@ApiTags('User Follows')
@Controller('user')
export class UserFollowController {
  constructor(private readonly followService: UserFollowService) {}

  @Permission('user')
  @Get('follows')
  async getList(@Req() req: any, @Query() query: any) {
    return this.followService.getList(req.user.sub, query);
  }

  @Permission('user')
  @Post('comics/:id/follow')
  async follow(@Req() req: any, @Param('id') id: string) {
    return this.followService.follow(req.user.sub, id);
  }

  @Permission('user')
  @Delete('comics/:id/follow')
  async unfollow(@Req() req: any, @Param('id') id: string) {
    return this.followService.unfollow(req.user.sub, id);
  }
}
