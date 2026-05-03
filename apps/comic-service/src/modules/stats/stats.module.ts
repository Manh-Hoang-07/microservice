import { Module } from '@nestjs/common';
import { AdminStatsController } from './admin/controllers/admin-stats.controller';
import { AdminStatsService } from './admin/services/admin-stats.service';
import { StatsRepository } from './repositories/stats.repository';

@Module({
  controllers: [AdminStatsController],
  providers: [StatsRepository, AdminStatsService],
})
export class StatsModule {}
