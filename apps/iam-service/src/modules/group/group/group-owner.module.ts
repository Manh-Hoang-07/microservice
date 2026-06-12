import { Module } from '@nestjs/common';
import { GroupOwnerController, GroupAssignableRolesController, GroupMembersController } from './controllers/group-owner.controller';
import { GroupOwnerService } from './services/group-owner.service';
import { GroupMemberRoleRepository } from '../repositories/group-member-role.repository';
import { GroupRepository } from '../repositories/group.repository';

@Module({
  controllers: [GroupMembersController, GroupOwnerController, GroupAssignableRolesController],
  providers: [GroupOwnerService, GroupMemberRoleRepository, GroupRepository],
  exports: [GroupMemberRoleRepository],
})
export class GroupOwnerModule {}
