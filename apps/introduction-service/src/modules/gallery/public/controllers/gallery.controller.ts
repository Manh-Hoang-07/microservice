import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicGalleryService } from '../services/gallery.service';

@ApiTags('Public Galleries')
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
