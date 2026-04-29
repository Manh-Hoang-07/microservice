import { Module } from '@nestjs/common';
import { AdminStatsController } from './admin/controllers/admin-stats.controller';
import { AdminStatsService } from './admin/services/admin-stats.service';

@Module({
  controllers: [AdminStatsController],
  providers: [AdminStatsService],
})
export class StatsModule {}
