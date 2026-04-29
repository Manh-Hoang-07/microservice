import { Module } from '@nestjs/common';
import { AdminStatsController } from './admin/controllers/admin-stats.controller';
import { AdminStatsService } from './admin/services/admin-stats.service';
import { ComicStatsRepository } from './repositories/comic-stats.repository';

@Module({
  controllers: [AdminStatsController],
  providers: [ComicStatsRepository, AdminStatsService],
})
export class StatsModule {}
