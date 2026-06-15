import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminGalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { UpdateGalleryDto } from '../dtos/update-gallery.dto';
import { ListGalleryAdminQueryDto } from '../dtos/list-gallery.query.dto';

@Controller('admin/galleries')
export class AdminGalleryController {
  constructor(private readonly galleryService: AdminGalleryService) {}

  @Permission('cms.gallery.manage')
  @Get()
  async getList(@Query() query: ListGalleryAdminQueryDto) {
    return this.galleryService.getList(query);
  }

  @Permission('cms.gallery.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.galleryService.getOne(id);
  }

  @Permission('cms.gallery.manage')
  @AuditLog({ action: 'cms.gallery.create', resource: 'gallery' })
  @Post()
  async create(@Body() dto: CreateGalleryDto) {
    return this.galleryService.create(dto);
  }

  @Permission('cms.gallery.manage')
  @AuditLog({ action: 'cms.gallery.update', resource: 'gallery' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateGalleryDto) {
    return this.galleryService.update(id, dto);
  }

  @Permission('cms.gallery.manage')
  @AuditLog({ action: 'cms.gallery.delete', resource: 'gallery' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.galleryService.delete(id);
  }
}
