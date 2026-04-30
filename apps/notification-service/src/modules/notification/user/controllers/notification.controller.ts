import { Controller, Get, Patch, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserNotificationService } from '../services/notification.service';

@ApiTags('User Notifications')
@Controller('user/notifications')
export class UserNotificationController {
  constructor(private readonly notifService: UserNotificationService) {}

  @Permission('user')
  @Get()
  getList(@Req() req: any, @Query() query: any) {
    return this.notifService.getList(String(req.user.sub), query);
  }

  @Permission('user')
  @Get('unread/count')
  getUnreadCount(@Req() req: any) {
    return this.notifService.getUnreadCount(String(req.user.sub));
  }

  @Permission('user')
  @Get(':id')
  getOne(@Req() req: any, @Param('id') id: string) {
    return this.notifService.getOne(String(req.user.sub), toPrimaryKey(id));
  }

  @Permission('user')
  @Patch(':id/read')
  markAsRead(@Req() req: any, @Param('id') id: string) {
    return this.notifService.markAsRead(String(req.user.sub), toPrimaryKey(id));
  }

  @Permission('user')
  @Patch('read-all')
  markAllAsRead(@Req() req: any) {
    return this.notifService.markAllAsRead(String(req.user.sub));
  }
}
