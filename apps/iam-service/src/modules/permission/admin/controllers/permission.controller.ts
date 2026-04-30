import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}

  @Permission('permission.manage')
  @Get()
  getList(@Query() query: any) {
    return this.service.getList(query);
  }

  @Permission('permission.manage')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(toPrimaryKey(id));
  }

  @Permission('permission.manage')
  @Post()
  create(@Body() dto: CreatePermissionDto, @Req() req: any) {
    return this.service.create(dto, BigInt(req.user.sub));
  }

  @Permission('permission.manage')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionDto, @Req() req: any) {
    return this.service.update(toPrimaryKey(id), dto, BigInt(req.user.sub));
  }

  @Permission('permission.manage')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(toPrimaryKey(id));
  }
}
