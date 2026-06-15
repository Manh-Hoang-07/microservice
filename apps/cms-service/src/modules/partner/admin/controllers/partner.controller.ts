import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminPartnerService } from '../services/partner.service';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';
import { ListPartnerAdminQueryDto } from '../dtos/list-partner.query.dto';

@Controller('admin/partners')
export class AdminPartnerController {
  constructor(private readonly partnerService: AdminPartnerService) {}

  @Permission('cms.partner.manage')
  @Get()
  async getList(@Query() query: ListPartnerAdminQueryDto) {
    return this.partnerService.getList(query);
  }

  @Permission('cms.partner.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.partnerService.getOne(id);
  }

  @Permission('cms.partner.manage')
  @AuditLog({ action: 'cms.partner.create', resource: 'partner' })
  @Post()
  async create(@Body() dto: CreatePartnerDto) {
    return this.partnerService.create(dto);
  }

  @Permission('cms.partner.manage')
  @AuditLog({ action: 'cms.partner.update', resource: 'partner' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdatePartnerDto) {
    return this.partnerService.update(id, dto);
  }

  @Permission('cms.partner.manage')
  @AuditLog({ action: 'cms.partner.delete', resource: 'partner' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.partnerService.delete(id);
  }
}
