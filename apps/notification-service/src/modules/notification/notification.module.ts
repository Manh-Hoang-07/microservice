import { Module } from '@nestjs/common';
import { AdminNotificationController } from './admin/controllers/notification.controller';
import { AdminNotificationService } from './admin/services/notification.service';
import { UserNotificationController } from './user/controllers/notification.controller';
import { UserNotificationService } from './user/services/notification.service';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  controllers: [AdminNotificationController, UserNotificationController],
  providers: [NotificationRepository, AdminNotificationService, UserNotificationService],
  exports: [AdminNotificationService, NotificationRepository],
})
export class NotificationModule {}
