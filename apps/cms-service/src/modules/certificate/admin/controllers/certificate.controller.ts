import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminCertificateService } from '../services/certificate.service';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';
import { ListCertificateAdminQueryDto } from '../dtos/list-certificate.query.dto';

@Controller('admin/certificates')
export class AdminCertificateController {
  constructor(private readonly certificateService: AdminCertificateService) {}

  @Permission('introduction.manage')
  @Get()
  async getList(@Query() query: ListCertificateAdminQueryDto) {
    return this.certificateService.getList(query);
  }

  @Permission('introduction.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.certificateService.getOne(toPrimaryKey(id));
  }

  @Permission('introduction.manage')
  @Post()
  async create(@Body() dto: CreateCertificateDto) {
    return this.certificateService.create(dto);
  }

  @Permission('introduction.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCertificateDto) {
    return this.certificateService.update(toPrimaryKey(id), dto);
  }

  @Permission('introduction.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.certificateService.delete(toPrimaryKey(id));
  }
}
