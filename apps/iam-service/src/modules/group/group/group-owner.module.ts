import { Module } from '@nestjs/common';
import { GroupInfoController, GroupMembersController, GroupOwnerController, GroupAssignableRolesController } from './controllers/group-owner.controller';
import { GroupOwnerService } from './services/group-owner.service';
import { GroupMemberRoleRepository } from '../repositories/group-member-role.repository';
import { GroupRepository } from '../repositories/group.repository';
import { GroupMembersService } from '../services/group-members.service';
import { AuthClient } from '../../../clients/auth.client';

@Module({
  controllers: [
    GroupInfoController,
    GroupMembersController,
    GroupOwnerController,
    GroupAssignableRolesController,
  ],
  providers: [GroupOwnerService, GroupMemberRoleRepository, GroupRepository, GroupMembersService, AuthClient],
  exports: [GroupMemberRoleRepository],
})
export class GroupOwnerModule {}
