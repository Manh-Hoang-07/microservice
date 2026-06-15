import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminFaqService } from '../services/faq.service';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { ListFaqAdminQueryDto } from '../dtos/list-faq.query.dto';

@Controller('admin/faqs')
export class AdminFaqController {
  constructor(private readonly faqService: AdminFaqService) {}

  @Permission('cms.faq.manage')
  @Get()
  async getList(@Query() query: ListFaqAdminQueryDto) {
    return this.faqService.getList(query);
  }

  @Permission('cms.faq.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.faqService.getOne(id);
  }

  @Permission('cms.faq.manage')
  @AuditLog({ action: 'cms.faq.create', resource: 'faq' })
  @Post()
  async create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @Permission('cms.faq.manage')
  @AuditLog({ action: 'cms.faq.update', resource: 'faq' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(id, dto);
  }

  @Permission('cms.faq.manage')
  @AuditLog({ action: 'cms.faq.delete', resource: 'faq' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.faqService.delete(id);
  }
}
