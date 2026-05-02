import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicAboutService } from '../services/about.service';
import { ListAboutPublicQueryDto } from '../../admin/dtos/list-about.query.dto';

@Controller('public/about-sections')
export class PublicAboutController {
  constructor(private readonly aboutService: PublicAboutService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListAboutPublicQueryDto) {
    return this.aboutService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.aboutService.getBySlug(slug);
  }
}
