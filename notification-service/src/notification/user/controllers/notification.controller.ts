import { Controller, Get, Patch, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '../../../common/permission.decorator';
import { UserNotificationService } from '../services/notification.service';

@ApiTags('User Notifications')
@Controller('user/notifications')
export class UserNotificationController {
  constructor(private readonly notifService: UserNotificationService) {}

  @Permission('user')
  @Get()
  async getList(@Req() req: any, @Query() query: any) {
    const userId = BigInt(req.user.sub);
    return this.notifService.getList(userId, query);
  }

  @Permission('user')
  @Get('unread/count')
  async getUnreadCount(@Req() req: any) {
    const userId = BigInt(req.user.sub);
    return this.notifService.getUnreadCount(userId);
  }

  @Permission('user')
  @Get(':id')
  async getOne(@Req() req: any, @Param('id') id: string) {
    const userId = BigInt(req.user.sub);
    return this.notifService.getOne(userId, BigInt(id));
  }

  @Permission('user')
  @Patch(':id/read')
  async markAsRead(@Req() req: any, @Param('id') id: string) {
    const userId = BigInt(req.user.sub);
    return this.notifService.markAsRead(userId, BigInt(id));
  }

  @Permission('user')
  @Patch('read-all')
  async markAllAsRead(@Req() req: any) {
    const userId = BigInt(req.user.sub);
    return this.notifService.markAllAsRead(userId);
  }
}
