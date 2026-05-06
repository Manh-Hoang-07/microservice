import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminStaffService } from '../services/staff.service';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
import { ListStaffAdminQueryDto } from '../dtos/list-staff.query.dto';

@Controller('admin/staff')
export class AdminStaffController {
  constructor(private readonly staffService: AdminStaffService) {}

  @Permission('introduction.manage')
  @Get()
  async getList(@Query() query: ListStaffAdminQueryDto) {
    return this.staffService.getList(query);
  }

  @Permission('introduction.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.staffService.getOne(toPrimaryKey(id));
  }

  @Permission('introduction.manage')
  @Post()
  async create(@Body() dto: CreateStaffDto) {
    return this.staffService.create(dto);
  }

  @Permission('introduction.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateStaffDto) {
    return this.staffService.update(toPrimaryKey(id), dto);
  }

  @Permission('introduction.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.staffService.delete(toPrimaryKey(id));
  }
}
