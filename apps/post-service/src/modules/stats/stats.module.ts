import { Module } from '@nestjs/common';
import { ViewCronService } from './services/view-cron.service';
import { StatsRepository } from './repositories/stats.repository';
import { StatsAdminController } from './admin/controllers/stats.controller';
import { StatsAdminService } from './admin/services/stats.service';
import { GroupStatsController } from './group/controllers/group-stats.controller';
import { GroupStatsService } from './group/services/group-stats.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [StatsAdminController, GroupStatsController],
  providers: [StatsRepository, ViewCronService, StatsAdminService, GroupStatsService],
})
export class StatsModule {}
