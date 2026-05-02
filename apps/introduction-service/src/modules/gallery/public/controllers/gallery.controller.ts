import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicGalleryService } from '../services/gallery.service';

@Controller('public/galleries')
export class PublicGalleryController {
  constructor(private readonly galleryService: PublicGalleryService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.galleryService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.galleryService.getBySlug(slug);
  }
}
