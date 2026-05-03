import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { PublicPartnerService } from '../services/partner.service';
import { ListPartnerPublicQueryDto } from '../../admin/dtos/list-partner.query.dto';

@Controller('public/partners')
export class PublicPartnerController {
  constructor(private readonly partnerService: PublicPartnerService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListPartnerPublicQueryDto) {
    return this.partnerService.getList(query);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.partnerService.getOne(toPrimaryKey(id));
  }
}
