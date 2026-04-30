import { Global, Module } from '@nestjs/common';
import { RbacService } from './services/rbac.service';
import { RbacCacheService } from './services/rbac-cache.service';
import { RbacPermissionIndexService } from './services/rbac-permission-index.service';
import { RbacRoleAssignmentService } from './services/rbac-role-assignment.service';
import { RbacRepository } from './repositories/rbac.repository';

@Global()
@Module({
  providers: [
    RbacRepository,
    RbacService,
    RbacCacheService,
    RbacPermissionIndexService,
    RbacRoleAssignmentService,
  ],
  exports: [RbacService, RbacCacheService],
})
export class RbacModule {}
