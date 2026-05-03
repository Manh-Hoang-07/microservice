import { Module } from '@nestjs/common';
import { PermissionController } from './admin/controllers/permission.controller';
import { PermissionService } from './admin/services/permission.service';
import { PermissionRepository } from './repositories/permission.repository';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
