import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PermissionGroup, ParseBigIntPipe } from '@package/common';
import { GroupOwnerService } from '../services/group-owner.service';
import { AddMemberByIdentifierDto } from '../dtos/add-member-by-identifier.dto';
import { AssignMemberRoleDto } from '../dtos/assign-member-role.dto';
import { SyncMemberRolesDto } from '../dtos/sync-member-roles.dto';
import { ListMembersQueryDto } from '../dtos/list-members.query.dto';
import { UpdateGroupInfoDto } from '../dtos/update-group-info.dto';

// ─── Group info (chủ nhóm quản lý thông tin cơ bản) ─────────────────────────

@Controller('groups/:id')
export class GroupInfoController {
  constructor(private readonly service: GroupOwnerService) {}

  @PermissionGroup('group.info.manage', { param: 'id' })
  @Get()
  getGroupInfo(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.service.getGroupInfo(String(id));
  }

  @PermissionGroup('group.info.manage', { param: 'id' })
  @Put()
  updateGroupInfo(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() dto: UpdateGroupInfoDto,
  ) {
    return this.service.updateGroupInfo(String(id), dto);
  }
}

// ─── Members ─────────────────────────────────────────────────────────────────

@Controller('groups/:id/members')
export class GroupMembersController {
  constructor(private readonly service: GroupOwnerService) {}

  @PermissionGroup('group.member.manage', { param: 'id' })
  @Get()
  getMembers(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Query() query: ListMembersQueryDto,
  ) {
    return this.service.getMembers(String(id), query);
  }

  @PermissionGroup('group.member.add', { param: 'id' })
  @Post()
  addMember(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() dto: AddMemberByIdentifierDto,
  ) {
    return this.service.addMember(String(id), dto);
  }

  @PermissionGroup('group.member.remove', { param: 'id' })
  @Delete(':userId')
  removeMember(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
  ) {
    return this.service.removeMember(String(id), userId);
  }
}

// ─── Assignable roles ────────────────────────────────────────────────────────

@Controller('groups/:id/assignable-roles')
export class GroupAssignableRolesController {
  constructor(private readonly service: GroupOwnerService) {}

  @PermissionGroup('group.member.manage', { param: 'id' })
  @Get()
  getAssignableRoles(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.service.getAssignableRoles(String(id));
  }
}

// ─── Member roles ────────────────────────────────────────────────────────────

@Controller('groups/:id/members/:userId/roles')
export class GroupOwnerController {
  constructor(private readonly service: GroupOwnerService) {}

  @PermissionGroup('group.member.manage', { param: 'id' })
  @Get()
  getMemberRoles(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
  ) {
    return this.service.getMemberRoles(String(id), userId);
  }

  @PermissionGroup('group.member.manage', { param: 'id' })
  @Post()
  assignRole(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Body() dto: AssignMemberRoleDto,
  ) {
    return this.service.assignRole(String(id), userId, dto);
  }

  @PermissionGroup('group.member.manage', { param: 'id' })
  @Delete(':roleId')
  removeRole(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.service.removeRole(String(id), userId, roleId);
  }

  @PermissionGroup('group.member.manage', { param: 'id' })
  @Put('sync')
  syncRoles(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Body() dto: SyncMemberRolesDto,
  ) {
    return this.service.syncRoles(String(id), userId, dto);
  }
}
