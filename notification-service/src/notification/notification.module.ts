import { Module } from '@nestjs/common';
import { AdminNotificationController } from './admin/controllers/notification.controller';
import { AdminNotificationService } from './admin/services/notification.service';
import { UserNotificationController } from './user/controllers/notification.controller';
import { UserNotificationService } from './user/services/notification.service';

@Module({
  controllers: [AdminNotificationController, UserNotificationController],
  providers: [AdminNotificationService, UserNotificationService],
  exports: [AdminNotificationService],
})
export class NotificationModule {}
