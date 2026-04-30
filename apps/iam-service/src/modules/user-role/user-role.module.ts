import { Module } from '@nestjs/common';
import { UserRoleController } from './admin/controllers/user-role.controller';
import { UserRoleService } from './admin/services/user-role.service';
import { UserRoleRepository } from './repositories/user-role.repository';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService, UserRoleRepository],
})
export class UserRoleModule {}
