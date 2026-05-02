import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicBannerService } from '../services/banner.service';

@Controller('public/banners')
export class PublicBannerController {
  constructor(private readonly bannerService: PublicBannerService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.bannerService.getList(query);
  }
}
