import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { SyncPermissionsDto } from '../dtos/sync-permissions.dto';
import { ListRolesAdminQueryDto } from '../dtos/list-role.query.dto';

@Controller('admin/roles')
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
  @AuditLog({ action: 'role.create', resource: 'role', includeBody: true })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    const ctx = session()!;
    return this.service.create(dto, toPrimaryKey(ctx.userId!));
  }

  @Permission('role.manage')
  @AuditLog({ action: 'role.update', resource: 'role', includeBody: true })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    const ctx = session()!;
    return this.service.update(toPrimaryKey(id), dto, toPrimaryKey(ctx.userId!));
  }

  @Permission('role.manage')
  @AuditLog({ action: 'role.delete', resource: 'role' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(toPrimaryKey(id));
  }

  @Permission('role.manage')
  @AuditLog({ action: 'role.permissions.sync', resource: 'role', includeBody: true })
  @Put(':id/permissions')
  syncPermissions(@Param('id') id: string, @Body() dto: SyncPermissionsDto) {
    const ctx = session()!;
    return this.service.syncPermissions(toPrimaryKey(id), dto, {
      id: ctx.userId ?? '',
    });
  }
}
