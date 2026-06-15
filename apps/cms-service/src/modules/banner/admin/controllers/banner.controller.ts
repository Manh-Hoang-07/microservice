import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminBannerService } from '../services/banner.service';
import { CreateBannerDto } from '../dtos/create-banner.dto';
import { UpdateBannerDto } from '../dtos/update-banner.dto';
import { ListBannersAdminQueryDto } from '../dtos/list-banners.query.dto';

@Controller('admin/banners')
export class AdminBannerController {
  constructor(private readonly bannerService: AdminBannerService) {}

  @Permission('cms.banner.manage')
  @Get()
  async getList(@Query() query: ListBannersAdminQueryDto) {
    return this.bannerService.getList(query);
  }

  @Permission('cms.banner.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.bannerService.getOne(id);
  }

  @Permission('cms.banner.manage')
  @AuditLog({ action: 'cms.banner.create', resource: 'banner' })
  @Post()
  async create(@Body() dto: CreateBannerDto) {
    return this.bannerService.create(dto);
  }

  @Permission('cms.banner.manage')
  @AuditLog({ action: 'cms.banner.update', resource: 'banner' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateBannerDto) {
    return this.bannerService.update(id, dto);
  }

  @Permission('cms.banner.manage')
  @AuditLog({ action: 'cms.banner.delete', resource: 'banner' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.bannerService.delete(id);
  }
}
