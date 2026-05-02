import { Controller, Get, Delete, HttpCode } from '@nestjs/common';
import { Public } from '@package/common';
import { GatewayHomepageService } from '../services/homepage.service';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: GatewayHomepageService) {}

  @Public()
  @Get()
  async getHomepage() {
    return this.homepageService.getHomepageData();
  }

  @Public()
  @Delete('cache')
  @HttpCode(204)
  async clearCache() {
    await this.homepageService.clearCache();
  }
}
