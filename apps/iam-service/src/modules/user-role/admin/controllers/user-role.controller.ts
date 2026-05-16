import { BadRequestException, Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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
  getUserRoles(@Param('userId') userId: string) {
    return this.service.getUserRoles(validateId(userId, 'userId'));
  }

  @Permission('user.role.assign')
  @Post(':userId/roles')
  assignRole(@Param('userId') userId: string, @Body() dto: AssignRoleDto) {
    const ctx = session()!;
    return this.service.assignRole(validateId(userId, 'userId'), dto, {
      id: ctx.userId ?? '',
    });
  }

  @Permission('user.role.assign')
  @Delete(':userId/roles/:roleId')
  removeRole(@Param('userId') userId: string, @Param('roleId') roleId: string) {
    validateId(userId, 'userId');
    validateId(roleId, 'roleId');
    const ctx = session()!;
    return this.service.removeRole(userId, roleId, { id: ctx.userId ?? '' });
  }

  @Permission('user.role.assign')
  @Put(':userId/roles/sync')
  syncRoles(@Param('userId') userId: string, @Body() dto: SyncUserRolesDto) {
    const ctx = session()!;
    return this.service.syncRoles(validateId(userId, 'userId'), dto, {
      id: ctx.userId ?? '',
    });
  }
}
