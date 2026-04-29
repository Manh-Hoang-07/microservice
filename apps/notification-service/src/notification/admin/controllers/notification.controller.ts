import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { AdminNotificationService } from '../services/notification.service';

@ApiTags('Admin Notifications')
@Controller('admin/notifications')
export class AdminNotificationController {
  constructor(private readonly notifService: AdminNotificationService) {}

  @Permission('notification.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.notifService.getList(query);
  }

  @Permission('notification.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.notifService.getOne(BigInt(id));
  }

  @Permission('notification.manage')
  @Post()
  async create(@Body() body: any) {
    return this.notifService.create(body);
  }

  @Permission('notification.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.notifService.update(BigInt(id), body);
  }

  @Permission('notification.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notifService.delete(BigInt(id));
  }
}
