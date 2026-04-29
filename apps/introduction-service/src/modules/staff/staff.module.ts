import { Module } from '@nestjs/common';
import { AdminStaffController } from './admin/controllers/staff.controller';
import { AdminStaffService } from './admin/services/staff.service';
import { PublicStaffController } from './public/controllers/staff.controller';
import { PublicStaffService } from './public/services/staff.service';

@Module({
  controllers: [AdminStaffController, PublicStaffController],
  providers: [AdminStaffService, PublicStaffService],
  exports: [PublicStaffService],
})
export class StaffModule {}
