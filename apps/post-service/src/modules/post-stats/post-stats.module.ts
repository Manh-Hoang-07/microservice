import { Module } from '@nestjs/common';
import { ViewCronService } from './services/view-cron.service';
import { PostStatsRepository } from './repositories/post-stats.repository';

@Module({
  providers: [PostStatsRepository, ViewCronService],
})
export class PostStatsModule {}
