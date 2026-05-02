import { Controller, Get, Param, Query, Patch, Body, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminContactService } from '../services/contact.service';
import { ReplyContactDto } from '../dtos/reply-contact.dto';
import { ListContactsAdminQueryDto } from '../dtos/list-contacts.query.dto';

@Controller('admin/contacts')
export class AdminContactController {
  constructor(private readonly contactService: AdminContactService) {}

  @Permission('marketing.manage')
  @Get()
  async getList(@Query() query: ListContactsAdminQueryDto) {
    return this.contactService.getList(query);
  }

  @Permission('marketing.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.contactService.getOne(id);
  }

  @Permission('marketing.manage')
  @Patch(':id/reply')
  async reply(
    @Param('id') id: string,
    @Body() body: ReplyContactDto,
    @Req() req: any,
  ) {
    return this.contactService.reply(id, body.reply, req.user?.sub ?? req.user?.id ?? 0);
  }

  @Permission('marketing.manage')
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Permission('marketing.manage')
  @Patch(':id/close')
  async closeContact(@Param('id') id: string) {
    return this.contactService.closeContact(id);
  }
}
