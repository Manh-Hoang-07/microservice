import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Body,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { AdminContactService } from '../services/contact.service';

@ApiTags('Admin Contacts')
@Controller('admin/contacts')
export class AdminContactController {
  constructor(private readonly contactService: AdminContactService) {}

  @Permission('marketing.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.contactService.getList(query);
  }

  @Permission('marketing.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.contactService.getOne(BigInt(id));
  }

  @Permission('marketing.manage')
  @Patch(':id/reply')
  async reply(
    @Param('id') id: string,
    @Body('reply') reply: string,
    @Req() req: any,
  ) {
    const userId = BigInt(req.user?.sub || req.user?.id || 0);
    return this.contactService.reply(BigInt(id), reply, userId);
  }

  @Permission('marketing.manage')
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(BigInt(id));
  }

  @Permission('marketing.manage')
  @Patch(':id/close')
  async closeContact(@Param('id') id: string) {
    return this.contactService.closeContact(BigInt(id));
  }
}
