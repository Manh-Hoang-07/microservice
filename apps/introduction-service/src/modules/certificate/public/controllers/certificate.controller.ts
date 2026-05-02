import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicCertificateService } from '../services/certificate.service';

@Controller('public/certificates')
export class PublicCertificateController {
  constructor(private readonly certificateService: PublicCertificateService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.certificateService.getList(query);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.certificateService.getOne(id);
  }
}
