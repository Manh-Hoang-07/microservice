import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminGalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dtos/create-gallery.dto';
import { UpdateGalleryDto } from '../dtos/update-gallery.dto';
import { ListGalleryAdminQueryDto } from '../dtos/list-gallery.query.dto';

@Controller('admin/galleries')
export class AdminGalleryController {
  constructor(private readonly galleryService: AdminGalleryService) {}

  @Permission('introduction.manage')
  @Get()
  async getList(@Query() query: ListGalleryAdminQueryDto) {
    return this.galleryService.getList(query);
  }

  @Permission('introduction.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.galleryService.getOne(toPrimaryKey(id));
  }

  @Permission('introduction.manage')
  @Post()
  async create(@Body() dto: CreateGalleryDto) {
    return this.galleryService.create(dto);
  }

  @Permission('introduction.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGalleryDto) {
    return this.galleryService.update(toPrimaryKey(id), dto);
  }

  @Permission('introduction.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.galleryService.delete(toPrimaryKey(id));
  }
}
