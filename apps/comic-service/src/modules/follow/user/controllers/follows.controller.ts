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
    const userId = BigInt(req.user.sub);
    return this.followService.getList(userId, query);
  }

  @Permission('user')
  @Post('comics/:id/follow')
  async follow(@Req() req: any, @Param('id') id: string) {
    const userId = BigInt(req.user.sub);
    return this.followService.follow(userId, BigInt(id));
  }

  @Permission('user')
  @Delete('comics/:id/follow')
  async unfollow(@Req() req: any, @Param('id') id: string) {
    const userId = BigInt(req.user.sub);
    return this.followService.unfollow(userId, BigInt(id));
  }
}
