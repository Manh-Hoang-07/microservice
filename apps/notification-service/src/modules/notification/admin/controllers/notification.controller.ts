import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminNotificationService } from '../services/notification.service';
import { SendNotificationDto } from '../dtos/send-notification.dto';

@Controller('admin/notifications')
export class AdminNotificationController {
  constructor(private readonly notifService: AdminNotificationService) {}

  @Permission('notification.manage')
  @Get()
  getList(@Query() query: any) {
    return this.notifService.getList(query);
  }

  @Permission('notification.manage')
  @Post('send')
  send(@Body() dto: SendNotificationDto) {
    return this.notifService.send(dto);
  }

  @Permission('notification.manage')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notifService.delete(toPrimaryKey(id));
  }
}
