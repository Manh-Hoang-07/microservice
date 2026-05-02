import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { UserRoleService } from '../services/user-role.service';
import { AssignRoleDto } from '../dtos/assign-role.dto';
import { SyncUserRolesDto } from '../dtos/sync-user-roles.dto';

@Controller('users')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Permission('user.role.assign')
  @Get(':userId/roles')
  getUserRoles(@Param('userId') userId: string, @Query('groupId') groupId?: string) {
    return this.service.getUserRoles(userId, groupId);
  }

  @Permission('user.role.assign')
  @Post(':userId/roles')
  assignRole(@Param('userId') userId: string, @Body() dto: AssignRoleDto) {
    return this.service.assignRole(userId, dto);
  }

  @Permission('user.role.assign')
  @Delete(':userId/roles/:roleId')
  removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @Query('groupId') groupId: string,
  ) {
    return this.service.removeRole(userId, roleId, groupId);
  }

  @Permission('user.role.assign')
  @Put(':userId/roles/sync')
  syncRoles(@Param('userId') userId: string, @Body() dto: SyncUserRolesDto) {
    return this.service.syncRoles(userId, dto);
  }
}
