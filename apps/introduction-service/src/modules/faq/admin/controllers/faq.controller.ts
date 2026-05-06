import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminFaqService } from '../services/faq.service';
import { CreateFaqDto } from '../dtos/create-faq.dto';
import { UpdateFaqDto } from '../dtos/update-faq.dto';
import { ListFaqAdminQueryDto } from '../dtos/list-faq.query.dto';

@Controller('admin/faqs')
export class AdminFaqController {
  constructor(private readonly faqService: AdminFaqService) {}

  @Permission('introduction.manage')
  @Get()
  async getList(@Query() query: ListFaqAdminQueryDto) {
    return this.faqService.getList(query);
  }

  @Permission('introduction.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.faqService.getOne(toPrimaryKey(id));
  }

  @Permission('introduction.manage')
  @Post()
  async create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @Permission('introduction.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(toPrimaryKey(id), dto);
  }

  @Permission('introduction.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.faqService.delete(toPrimaryKey(id));
  }
}
