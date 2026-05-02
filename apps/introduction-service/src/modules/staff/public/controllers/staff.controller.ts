import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { PublicStaffService } from '../services/staff.service';

@Controller('public/staff')
export class PublicStaffController {
  constructor(private readonly staffService: PublicStaffService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.staffService.getList(query);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.staffService.getOne(toPrimaryKey(id));
  }
}
