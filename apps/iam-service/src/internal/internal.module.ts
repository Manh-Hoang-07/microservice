import { Module } from '@nestjs/common';
import { InternalRbacController } from './controllers/rbac-check.controller';
import { InternalPermissionController } from './controllers/permission.controller';
import { InternalGroupController } from './controllers/group.controller';
import { InternalGuard } from '@package/common';
import { PermissionModule } from '../modules/permission/permission.module';
import { GroupModule } from '../modules/group/group.module';

@Module({
  imports: [PermissionModule, GroupModule],
  controllers: [
    InternalRbacController,
    InternalPermissionController,
    InternalGroupController,
  ],
  providers: [InternalGuard],
})
export class InternalModule {}
