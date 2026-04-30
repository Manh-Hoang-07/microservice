import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { SyncPermissionsDto } from '../dtos/sync-permissions.dto';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Permission('role.manage')
  @Get()
  getList(@Query() query: any) {
    return this.service.getList(query);
  }

  @Permission('role.manage')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(toPrimaryKey(id));
  }

  @Permission('role.manage')
  @Post()
  create(@Body() dto: CreateRoleDto, @Req() req: any) {
    return this.service.create(dto, BigInt(req.user.sub));
  }

  @Permission('role.manage')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto, @Req() req: any) {
    return this.service.update(toPrimaryKey(id), dto, BigInt(req.user.sub));
  }

  @Permission('role.manage')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(toPrimaryKey(id));
  }

  @Permission('role.manage')
  @Put(':id/permissions')
  syncPermissions(@Param('id') id: string, @Body() dto: SyncPermissionsDto) {
    return this.service.syncPermissions(toPrimaryKey(id), dto);
  }
}
