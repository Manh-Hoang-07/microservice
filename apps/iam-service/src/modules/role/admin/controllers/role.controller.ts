import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { SyncPermissionsDto } from '../dtos/sync-permissions.dto';
import { ListRolesAdminQueryDto } from '../dtos/list-role.query.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Permission('role.manage')
  @Get()
  getList(@Query() query: ListRolesAdminQueryDto) {
    return this.service.getList(query);
  }

  @Permission('role.manage')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(toPrimaryKey(id));
  }

  @Permission('role.manage')
  @Post()
  create(@Body() dto: CreateRoleDto) {
    const ctx = session()!;
    return this.service.create(dto, toPrimaryKey(ctx.userId!));
  }

  @Permission('role.manage')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    const ctx = session()!;
    return this.service.update(toPrimaryKey(id), dto, toPrimaryKey(ctx.userId!));
  }

  @Permission('role.manage')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(toPrimaryKey(id));
  }

  @Permission('role.manage')
  @Put(':id/permissions')
  syncPermissions(@Param('id') id: string, @Body() dto: SyncPermissionsDto) {
    const ctx = session()!;
    return this.service.syncPermissions(toPrimaryKey(id), dto, {
      id: ctx.userId ?? '',
    });
  }
}
