import { Controller, Get, Delete, HttpCode } from '@nestjs/common';
import { Public, Internal } from '@package/common';
import { GatewayHomepageService } from '../services/homepage.service';

@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: GatewayHomepageService) {}

  @Public()
  @Get()
  async getHomepage() {
    return this.homepageService.getHomepageData();
  }

  /**
   * Cache flush — restricted to internal callers via `INTERNAL_API_SECRET`.
   * Previously `@Public()`, which let any anonymous caller force a stampede
   * across all upstream services on demand.
   */
  @Internal()
  @Delete('cache')
  @HttpCode(204)
  async clearCache() {
    await this.homepageService.clearCache();
  }
}
