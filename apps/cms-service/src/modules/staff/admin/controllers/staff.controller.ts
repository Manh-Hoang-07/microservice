import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminStaffService } from '../services/staff.service';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
import { ListStaffAdminQueryDto } from '../dtos/list-staff.query.dto';

@Controller('admin/staff')
export class AdminStaffController {
  constructor(private readonly staffService: AdminStaffService) {}

  @Permission('cms.staff.manage')
  @Get()
  async getList(@Query() query: ListStaffAdminQueryDto) {
    return this.staffService.getList(query);
  }

  @Permission('cms.staff.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.staffService.getOne(id);
  }

  @Permission('cms.staff.manage')
  @AuditLog({ action: 'cms.staff.create', resource: 'staff' })
  @Post()
  async create(@Body() dto: CreateStaffDto) {
    return this.staffService.create(dto);
  }

  @Permission('cms.staff.manage')
  @AuditLog({ action: 'cms.staff.update', resource: 'staff' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateStaffDto) {
    return this.staffService.update(id, dto);
  }

  @Permission('cms.staff.manage')
  @AuditLog({ action: 'cms.staff.delete', resource: 'staff' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.staffService.delete(id);
  }
}
