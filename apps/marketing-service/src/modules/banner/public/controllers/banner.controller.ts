import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicBannerService } from '../services/banner.service';

@ApiTags('Public Banners')
@Controller('public/banners')
export class PublicBannerController {
  constructor(private readonly bannerService: PublicBannerService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.bannerService.getList(query);
  }
}
