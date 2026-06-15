import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, AuditLog, ParseBigIntPipe } from '@package/common';
import { AdminCertificateService } from '../services/certificate.service';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';
import { ListCertificateAdminQueryDto } from '../dtos/list-certificate.query.dto';

@Controller('admin/certificates')
export class AdminCertificateController {
  constructor(private readonly certificateService: AdminCertificateService) {}

  @Permission('cms.certificate.manage')
  @Get()
  async getList(@Query() query: ListCertificateAdminQueryDto) {
    return this.certificateService.getList(query);
  }

  @Permission('cms.certificate.manage')
  @Get(':id')
  async getOne(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.certificateService.getOne(id);
  }

  @Permission('cms.certificate.manage')
  @AuditLog({ action: 'cms.certificate.create', resource: 'certificate' })
  @Post()
  async create(@Body() dto: CreateCertificateDto) {
    return this.certificateService.create(dto);
  }

  @Permission('cms.certificate.manage')
  @AuditLog({ action: 'cms.certificate.update', resource: 'certificate' })
  @Put(':id')
  async update(@Param('id', ParseBigIntPipe) id: bigint, @Body() dto: UpdateCertificateDto) {
    return this.certificateService.update(id, dto);
  }

  @Permission('cms.certificate.manage')
  @AuditLog({ action: 'cms.certificate.delete', resource: 'certificate' })
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return this.certificateService.delete(id);
  }
}
