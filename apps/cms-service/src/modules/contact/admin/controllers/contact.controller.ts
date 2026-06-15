import { Controller, Get, Param, Query, Patch, Body } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminContactService } from '../services/contact.service';
import { ReplyContactDto } from '../dtos/reply-contact.dto';
import { ListContactsAdminQueryDto } from '../dtos/list-contacts.query.dto';

@Controller('admin/contacts')
export class AdminContactController {
  constructor(
    private readonly contactService: AdminContactService,
  ) {}

  @Permission('cms.contact.manage')
  @Get()
  async getList(@Query() query: ListContactsAdminQueryDto) {
    return this.contactService.getList(query);
  }

  @Permission('cms.contact.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.contactService.getOne(id);
  }

  @Permission('cms.contact.manage')
  @AuditLog({ action: 'cms.contact.reply', resource: 'contact' })
  @Patch(':id/reply')
  async reply(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() body: ReplyContactDto,
  ) {
    const ctx = session()!;
    const actorId = ctx.userId ? toPrimaryKey(ctx.userId) : undefined;
    return this.contactService.reply(id, body.reply, actorId);
  }

  @Permission('cms.contact.manage')
  @AuditLog({ action: 'cms.contact.mark_read', resource: 'contact' })
  @Patch(':id/read')
  async markAsRead(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.contactService.markAsRead(id);
  }

  @Permission('cms.contact.manage')
  @AuditLog({ action: 'cms.contact.close', resource: 'contact' })
  @Patch(':id/close')
  async closeContact(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.contactService.closeContact(id);
  }
}
