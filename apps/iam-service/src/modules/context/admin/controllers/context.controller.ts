import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { ContextService } from '../services/context.service';
import { CreateContextDto } from '../dtos/create-context.dto';
import { UpdateContextDto } from '../dtos/update-context.dto';
import { SyncRolesDto } from '../dtos/sync-roles.dto';

@ApiTags('Contexts')
@Controller('contexts')
export class ContextController {
  constructor(private readonly service: ContextService) {}

  @Permission('context.manage')
  @Get()
  getList(@Query() query: any) {
    return this.service.getList(query);
  }

  @Permission('context.manage')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(toPrimaryKey(id));
  }

  @Permission('context.manage')
  @Post()
  create(@Body() dto: CreateContextDto, @Req() req: any) {
    return this.service.create(dto, BigInt(req.user.sub));
  }

  @Permission('context.manage')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContextDto, @Req() req: any) {
    return this.service.update(toPrimaryKey(id), dto, BigInt(req.user.sub));
  }

  @Permission('context.manage')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(toPrimaryKey(id));
  }

  @Permission('context.manage')
  @Put(':id/roles')
  syncRoles(@Param('id') id: string, @Body() dto: SyncRolesDto) {
    return this.service.syncRoles(toPrimaryKey(id), dto);
  }
}
