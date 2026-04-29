import { Controller, Get, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';
import { BffHomepageService } from '../services/homepage.service';

const Public = () => SetMetadata('perms_required', ['public']);

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly service: BffHomepageService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Homepage aggregated data' })
  async getHomepage() {
    return this.service.getHomepageData();
  }

  @Delete('cache')
  @Public()
  @HttpCode(204)
  @ApiOperation({ summary: 'Purge homepage cache' })
  async clearCache() {
    await this.service.clearCache();
  }
}
