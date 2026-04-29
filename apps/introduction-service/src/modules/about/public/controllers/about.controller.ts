import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicAboutService } from '../services/about.service';

@ApiTags('Public About Sections')
@Controller('public/about-sections')
export class PublicAboutController {
  constructor(private readonly aboutService: PublicAboutService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.aboutService.getList(query);
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.aboutService.getBySlug(slug);
  }
}
