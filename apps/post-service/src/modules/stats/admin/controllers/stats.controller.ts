import { Controller, Get, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { StatsAdminService } from '../services/stats.service';
import { DailyStatsQueryDto } from '../dtos/stats-query.dto';

@Controller('admin/stats')
export class StatsAdminController {
  constructor(private readonly statsService: StatsAdminService) {}

  @Permission('post.manage')
  @Get('overview')
  getOverview() {
    return this.statsService.getOverview();
  }

  @Permission('post.manage')
  @Get('posts/:id/daily')
  getPostDailyStats(@Param('id') id: string, @Query() query: DailyStatsQueryDto) {
    return this.statsService.getPostDailyStats(id, query);
  }
}
