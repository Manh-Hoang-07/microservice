import { Module } from '@nestjs/common';
import { RoleController } from './admin/controllers/role.controller';
import { RoleService } from './admin/services/role.service';
import { RoleRepository } from './repositories/role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
