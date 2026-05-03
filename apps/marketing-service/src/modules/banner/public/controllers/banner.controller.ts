import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicBannerService } from '../services/banner.service';
import { ListBannersPublicQueryDto } from '../dtos/list-banners.query.dto';

@Controller('public/banners')
export class PublicBannerController {
  constructor(private readonly bannerService: PublicBannerService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListBannersPublicQueryDto) {
    return this.bannerService.getList(query);
  }
}
