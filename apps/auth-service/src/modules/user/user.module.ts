import { Module } from '@nestjs/common';
import { UserAdminRepository } from './repositories/user-admin.repository';
import { AdminUserController } from './admin/controllers/user.controller';
import { AdminUserService } from './admin/services/user.service';
import { ProfileController } from './user/controllers/profile.controller';
import { ProfileService } from './user/services/profile.service';

@Module({
  controllers: [AdminUserController, ProfileController],
  providers: [UserAdminRepository, AdminUserService, ProfileService],
})
export class UserModule {}
