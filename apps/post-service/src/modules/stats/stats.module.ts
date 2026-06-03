import { Module } from '@nestjs/common';
import { ViewCronService } from './services/view-cron.service';
import { StatsRepository } from './repositories/stats.repository';
import { StatsAdminController } from './admin/controllers/stats.controller';
import { StatsAdminService } from './admin/services/stats.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [StatsAdminController],
  providers: [StatsRepository, ViewCronService, StatsAdminService],
})
export class StatsModule {}
