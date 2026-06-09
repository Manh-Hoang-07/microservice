import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Authenticated, ParseBigIntPipe, session } from '@package/common';
import { GroupOwnerService } from '../services/group-owner.service';
import { AssignMemberRoleDto } from '../dtos/assign-member-role.dto';
import { SyncMemberRolesDto } from '../dtos/sync-member-roles.dto';

@Authenticated()
@Controller('groups/:id/members/:userId/roles')
export class GroupOwnerController {
  constructor(private readonly service: GroupOwnerService) {}

  @Get()
  getMemberRoles(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
  ) {
    const callerId = session()!.userId ?? '';
    return this.service.getMemberRoles(String(id), userId, callerId);
  }

  @Post()
  assignRole(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Body() dto: AssignMemberRoleDto,
  ) {
    const callerId = session()!.userId ?? '';
    return this.service.assignRole(String(id), userId, dto, callerId);
  }

  @Delete(':roleId')
  removeRole(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    const callerId = session()!.userId ?? '';
    return this.service.removeRole(String(id), userId, roleId, callerId);
  }

  @Put('sync')
  syncRoles(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Param('userId') userId: string,
    @Body() dto: SyncMemberRolesDto,
  ) {
    const callerId = session()!.userId ?? '';
    return this.service.syncRoles(String(id), userId, dto, callerId);
  }
}
