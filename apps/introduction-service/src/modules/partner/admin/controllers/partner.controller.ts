import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { AdminPartnerService } from '../services/partner.service';
import { CreatePartnerDto } from '../dtos/create-partner.dto';
import { UpdatePartnerDto } from '../dtos/update-partner.dto';

@Controller('admin/partners')
export class AdminPartnerController {
  constructor(private readonly partnerService: AdminPartnerService) {}

  @Permission('introduction.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.partnerService.getList(query);
  }

  @Permission('introduction.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.partnerService.getOne(id);
  }

  @Permission('introduction.manage')
  @Post()
  async create(@Body() dto: CreatePartnerDto) {
    return this.partnerService.create(dto);
  }

  @Permission('introduction.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
    return this.partnerService.update(id, dto);
  }

  @Permission('introduction.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.partnerService.delete(id);
  }
}
