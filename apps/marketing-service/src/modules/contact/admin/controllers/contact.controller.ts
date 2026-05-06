import { Controller, Get, Param, Query, Patch, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
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
    return this.contactService.getOne(toPrimaryKey(id));
  }

  @Permission('marketing.manage')
  @Patch(':id/reply')
  async reply(
    @Param('id') id: string,
    @Body() body: ReplyContactDto,
    @Req() req: Request,
  ) {
    const actorId = (req as any).user?.sub ? toPrimaryKey((req as any).user.sub) : undefined;
    return this.contactService.reply(toPrimaryKey(id), body.reply, actorId);
  }

  @Permission('marketing.manage')
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(toPrimaryKey(id));
  }

  @Permission('marketing.manage')
  @Patch(':id/close')
  async closeContact(@Param('id') id: string) {
    return this.contactService.closeContact(toPrimaryKey(id));
  }
}
