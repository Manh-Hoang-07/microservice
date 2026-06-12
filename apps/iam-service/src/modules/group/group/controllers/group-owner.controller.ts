import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PermissionGroup, ParseBigIntPipe, BaseListQueryDto } from '@package/common';
import { GroupOwnerService } from '../services/group-owner.service';
import { AddMemberDto } from '../../admin/dtos/add-member.dto';
import { AssignMemberRoleDto } from '../dtos/assign-member-role.dto';
import { SyncMemberRolesDto } from '../dtos/sync-member-roles.dto';

@PermissionGroup('group.member.manage')
@Controller('groups/:id/members')
export class GroupMembersController {
  constructor(private readonly service: GroupOwnerService) {}

  @Get()
  getMembers(@Param('id', ParseBigIntPipe) id: bigint, @Query() query: BaseListQueryDto) {
    return this.service.getMembers(String(id), query);
  }

  @Post()
  addMember(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: AddMemberDto) {
    return this.service.addMember(String(id), dto);
  }

  @Delete(':userId')
  removeMember(@Param('id', ParseBigIntPipe) id: bigint, @Param('userId') userId: string) {
    return this.service.removeMember(String(id), userId);
  }
}

@PermissionGroup('group.member.manage')
@Controller('groups/:id/assignable-roles')
export class GroupAssignableRolesController {
  constructor(private readonly service: GroupOwnerService) {}

  @Get()
  getAssignableRoles(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.service.getAssignableRoles(String(id));
  }
}

@PermissionGroup('group.member.manage')
@Controller('groups/:id/members/:userId/roles')
export class GroupOwnerController {
  constructor(private readonly service: GroupOwnerService) {}

  @Get()
  getMemberRoles(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
  ) {
    return this.service.getMemberRoles(String(id), userId);
  }

  @Post()
  assignRole(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Body() dto: AssignMemberRoleDto,
  ) {
    return this.service.assignRole(String(id), userId, dto);
  }

  @Delete(':roleId')
  removeRole(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.service.removeRole(String(id), userId, roleId);
  }

  @Put('sync')
  syncRoles(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Body() dto: SyncMemberRolesDto,
  ) {
    return this.service.syncRoles(String(id), userId, dto);
  }
}
