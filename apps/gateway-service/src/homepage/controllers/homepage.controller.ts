import { Controller, Get, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@package/common';
import { GatewayHomepageService } from '../services/homepage.service';

@ApiTags('Gateway Homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: GatewayHomepageService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Homepage aggregated data' })
  async getHomepage() {
    return this.homepageService.getHomepageData();
  }

  @Public()
  @Delete('cache')
  @HttpCode(204)
  @ApiOperation({ summary: 'Purge homepage cache' })
  async clearCache() {
    await this.homepageService.clearCache();
  }
}
