import { Module } from '@nestjs/common';
import { ViewCronService } from './services/view-cron.service';
import { StatsRepository } from './repositories/stats.repository';

@Module({
  providers: [StatsRepository, ViewCronService],
})
export class StatsModule {}
