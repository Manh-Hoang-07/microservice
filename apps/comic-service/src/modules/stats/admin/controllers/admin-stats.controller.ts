import { Controller, Get, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminStatsService } from '../services/admin-stats.service';

@Controller('admin/stats')
export class AdminStatsController {
  constructor(private readonly statsService: AdminStatsService) {}

  @Permission('comic.manage')
  @Get('dashboard')
  async getDashboard() {
    return this.statsService.getDashboard();
  }

  @Permission('comic.manage')
  @Get('top-comics')
  async getTopComics(@Query() query: any) {
    return this.statsService.getTopComics(query);
  }
}
