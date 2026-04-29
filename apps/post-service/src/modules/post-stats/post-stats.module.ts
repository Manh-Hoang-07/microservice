import { Module } from '@nestjs/common';
import { ViewCronService } from './services/view-cron.service';

@Module({
  providers: [ViewCronService],
})
export class PostStatsModule {}
