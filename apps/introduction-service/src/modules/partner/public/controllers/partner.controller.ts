import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../common/permission.decorator';
import { PublicPartnerService } from '../services/partner.service';

@ApiTags('Public Partners')
@Controller('public/partners')
export class PublicPartnerController {
  constructor(private readonly partnerService: PublicPartnerService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.partnerService.getList(query);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.partnerService.getOne(BigInt(id));
  }
}
