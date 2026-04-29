import { Module } from '@nestjs/common';
import { ViewCronService } from './services/view-cron.service';
import { ViewTrackingRepository } from './repositories/view-tracking.repository';

@Module({
  providers: [ViewTrackingRepository, ViewCronService],
})
export class ViewTrackingModule {}
