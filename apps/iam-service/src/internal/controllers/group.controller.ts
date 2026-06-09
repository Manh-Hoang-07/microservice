import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { Internal, InternalGuard } from '@package/common';
import { GroupRepository } from '../../modules/group/repositories/group.repository';
import { GroupMemberRoleRepository } from '../../modules/group/repositories/group-member-role.repository';
import { GroupMembershipQueryDto } from '../dtos/group-membership-query.dto';
import { GroupPermissionQueryDto } from '../dtos/group-permission-query.dto';

@Internal()
@UseGuards(InternalGuard)
@Controller('internal/groups')
export class InternalGroupController {
  constructor(
    private readonly groupRepo: GroupRepository,
    private readonly memberRoleRepo: GroupMemberRoleRepository,
  ) {}

  @Get('membership')
  async getMembership(@Query(ValidationPipe) query: GroupMembershipQueryDto) {
    const userGroups = await this.groupRepo.findUserGroups(query.userId);
    const match = userGroups.find((ug) => String(ug.groupId) === query.groupId);

    if (!match) return { isMember: false, isOwner: false };

    const isOwner =
      match.group.ownerId !== null && String(match.group.ownerId) === query.userId;
    return { isMember: true, isOwner };
  }

  @Get('member-permissions')
  async getMemberPermissions(@Query(ValidationPipe) query: GroupMembershipQueryDto) {
    const codes = await this.memberRoleRepo.getPermissionCodes(query.userId, query.groupId);
    return { codes };
  }

  @Get('check-permission')
  async checkPermission(@Query(ValidationPipe) query: GroupPermissionQueryDto) {
    const codes = await this.memberRoleRepo.getPermissionCodes(query.userId, query.groupId);
    return { allowed: codes.includes(query.permission) };
  }
}
