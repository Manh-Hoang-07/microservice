import { Module } from '@nestjs/common';
import { EnumModule } from '@package/common';
import { GroupController } from './admin/controllers/group.controller';
import { GroupService } from './admin/services/group.service';
import { GroupMemberRoleRepository } from './repositories/group-member-role.repository';
import { GroupRepository } from './repositories/group.repository';
import { GroupMembersService } from './services/group-members.service';
import { UserGroupController } from './user/controllers/user-group.controller';
import { UserGroupService } from './user/services/user-group.service';
import { GroupOwnerModule } from './group/group-owner.module';
import { AuthClient } from '../../clients/auth.client';
import * as GroupEnums from './enums';

@Module({
  imports: [
    EnumModule.register({ path: 'groups/enums', enums: GroupEnums }),
    GroupOwnerModule,
  ],
  controllers: [GroupController, UserGroupController],
  providers: [GroupService, GroupRepository, GroupMemberRoleRepository, GroupMembersService, UserGroupService, AuthClient],
  exports: [GroupRepository, GroupOwnerModule],
})
export class GroupModule {}
