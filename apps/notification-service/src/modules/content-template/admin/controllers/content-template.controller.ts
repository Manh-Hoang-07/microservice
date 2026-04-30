import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminContentTemplateService } from '../services/content-template.service';
import { CreateContentTemplateDto } from '../dtos/create-content-template.dto';
import { UpdateContentTemplateDto } from '../dtos/update-content-template.dto';

@ApiTags('Admin Content Templates')
@Controller('admin/content-templates')
export class AdminContentTemplateController {
  constructor(private readonly service: AdminContentTemplateService) {}

  @Permission('notification.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.service.getList(query);
  }

  @Permission('notification.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.service.getOne(toPrimaryKey(id));
  }

  @Permission('notification.manage')
  @Post()
  async create(@Body() dto: CreateContentTemplateDto) {
    return this.service.create(dto);
  }

  @Permission('notification.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateContentTemplateDto) {
    return this.service.update(toPrimaryKey(id), dto);
  }

  @Permission('notification.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(toPrimaryKey(id));
  }
}
