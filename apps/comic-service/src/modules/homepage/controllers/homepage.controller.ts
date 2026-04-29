import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@package/common';
import { HomepageService } from '../services/homepage.service';

@ApiTags('Homepage')
@Controller('public/homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Public()
  @Get('top-viewed')
  async getTopViewed(@Query('limit') limit?: string) {
    return this.homepageService.getTopViewed(Number(limit) || 12);
  }

  @Public()
  @Get('popular')
  async getPopular(@Query('limit') limit?: string) {
    return this.homepageService.getPopular(Number(limit) || 12);
  }

  @Public()
  @Get('newest')
  async getNewest(@Query('limit') limit?: string) {
    return this.homepageService.getNewest(Number(limit) || 12);
  }

  @Public()
  @Get('recently-updated')
  async getRecentlyUpdated(@Query('limit') limit?: string) {
    return this.homepageService.getRecentlyUpdated(Number(limit) || 12);
  }

  @Public()
  @Get('categories')
  async getCategories() {
    return this.homepageService.getCategories();
  }
}
