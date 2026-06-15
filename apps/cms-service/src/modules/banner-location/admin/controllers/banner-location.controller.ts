import { Controller, Get, Post, Put, Delete, Body, Param, Query, Patch } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminBannerLocationService } from '../services/banner-location.service';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';
import { ChangeStatusDto } from '../dtos/change-status.dto';
import { ListBannerLocationsAdminQueryDto } from '../dtos/list-banner-locations.query.dto';

@Controller('admin/banner-locations')
export class AdminBannerLocationController {
  constructor(private readonly bannerLocationService: AdminBannerLocationService) {}

  @Permission('cms.banner_location.manage')
  @Get()
  async getList(@Query() query: ListBannerLocationsAdminQueryDto) {
    return this.bannerLocationService.getList(query);
  }

  @Permission('cms.banner_location.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.bannerLocationService.getOne(id);
  }

  @Permission('cms.banner_location.manage')
  @AuditLog({ action: 'cms.banner_location.create', resource: 'banner_location' })
  @Post()
  async create(@Body() dto: CreateBannerLocationDto) {
    return this.bannerLocationService.create(dto);
  }

  @Permission('cms.banner_location.manage')
  @AuditLog({ action: 'cms.banner_location.update', resource: 'banner_location' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateBannerLocationDto) {
    return this.bannerLocationService.update(id, dto);
  }

  @Permission('cms.banner_location.manage')
  @AuditLog({ action: 'cms.banner_location.delete', resource: 'banner_location' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.bannerLocationService.delete(id);
  }

  @Permission('cms.banner_location.manage')
  @AuditLog({ action: 'cms.banner_location.change_status', resource: 'banner_location' })
  @Patch(':id/status')
  async changeStatus(@Param('id', ParseBigIntPipe) id: bigint, @Body() body: ChangeStatusDto) {
    return this.bannerLocationService.changeStatus(id, body);
  }
}
