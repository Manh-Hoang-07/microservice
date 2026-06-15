import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminAboutService } from '../services/about.service';
import { CreateAboutDto } from '../dtos/create-about.dto';
import { UpdateAboutDto } from '../dtos/update-about.dto';
import { ListAboutAdminQueryDto } from '../dtos/list-about.query.dto';

@Controller('admin/about-sections')
export class AdminAboutController {
  constructor(private readonly aboutService: AdminAboutService) {}

  @Permission('cms.about.manage')
  @Get()
  async getList(@Query() query: ListAboutAdminQueryDto) {
    return this.aboutService.getList(query);
  }

  @Permission('cms.about.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.aboutService.getOne(id);
  }

  @Permission('cms.about.manage')
  @AuditLog({ action: 'cms.about.create', resource: 'about' })
  @Post()
  async create(@Body() dto: CreateAboutDto) {
    return this.aboutService.create(dto);
  }

  @Permission('cms.about.manage')
  @AuditLog({ action: 'cms.about.update', resource: 'about' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateAboutDto) {
    return this.aboutService.update(id, dto);
  }

  @Permission('cms.about.manage')
  @AuditLog({ action: 'cms.about.delete', resource: 'about' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.aboutService.delete(id);
  }
}
