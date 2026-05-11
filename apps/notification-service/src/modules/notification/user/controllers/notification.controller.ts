import { Controller, Get, Patch, Param, Query } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserNotificationService } from '../services/notification.service';
import { ListNotificationsUserQueryDto } from '../dtos/list-notifications.query.dto';

@Controller('user/notifications')
export class UserNotificationController {
  constructor(
    private readonly notifService: UserNotificationService,
  ) {}

  @Permission('user')
  @Get()
  getList(@Query() query: ListNotificationsUserQueryDto) {
    const ctx = session()!;
    return this.notifService.getList(ctx.userId!, query);
  }

  @Permission('user')
  @Get('unread/count')
  getUnreadCount() {
    const ctx = session()!;
    return this.notifService.getUnreadCount(ctx.userId!);
  }

  @Permission('user')
  @Get(':id')
  getOne(@Param('id') id: string) {
    const ctx = session()!;
    return this.notifService.getOne(ctx.userId!, toPrimaryKey(id));
  }

  @Permission('user')
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    const ctx = session()!;
    return this.notifService.markAsRead(ctx.userId!, toPrimaryKey(id));
  }

  @Permission('user')
  @Patch('read-all')
  markAllAsRead() {
    const ctx = session()!;
    return this.notifService.markAllAsRead(ctx.userId!);
  }
}
