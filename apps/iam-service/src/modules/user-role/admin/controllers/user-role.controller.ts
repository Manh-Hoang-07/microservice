import { BadRequestException, Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { UserRoleService } from '../services/user-role.service';
import { AssignRoleDto } from '../dtos/assign-role.dto';
import { SyncUserRolesDto } from '../dtos/sync-user-roles.dto';

function validateId(value: string, name: string): string {
  if (!value || !/^\d+$/.test(value)) {
    throw new BadRequestException(`Invalid ${name}`);
  }
  return value;
}

@Controller('users')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  @Permission('user.role.assign')
  @Get(':userId/roles')
  getUserRoles(@Param('userId') userId: string, @Query('groupId') groupId?: string) {
    return this.service.getUserRoles(validateId(userId, 'userId'), groupId);
  }

  @Permission('user.role.assign')
  @Post(':userId/roles')
  assignRole(@Param('userId') userId: string, @Body() dto: AssignRoleDto, @Req() req: any) {
    const ctx = session()!;
    return this.service.assignRole(validateId(userId, 'userId'), dto, {
      id: ctx.userId ?? '',
      groupId: (req?.headers?.['x-group-id'] as string | undefined) ?? null,
    });
  }

  @Permission('user.role.assign')
  @Delete(':userId/roles/:roleId')
  removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @Query('groupId') groupId: string,
    @Req() req: any,
  ) {
    validateId(userId, 'userId');
    validateId(roleId, 'roleId');
    validateId(groupId, 'groupId');
    const ctx = session()!;
    return this.service.removeRole(userId, roleId, groupId, {
      id: ctx.userId ?? '',
      groupId: (req?.headers?.['x-group-id'] as string | undefined) ?? null,
    });
  }

  @Permission('user.role.assign')
  @Put(':userId/roles/sync')
  syncRoles(@Param('userId') userId: string, @Body() dto: SyncUserRolesDto, @Req() req: any) {
    const ctx = session()!;
    return this.service.syncRoles(validateId(userId, 'userId'), dto, {
      id: ctx.userId ?? '',
      groupId: (req?.headers?.['x-group-id'] as string | undefined) ?? null,
    });
  }
}
