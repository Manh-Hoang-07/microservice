import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicWardService } from '../services/ward.service';
import { ListWardsPublicQueryDto } from '../dtos/list-ward.query.dto';

@Controller()
export class PublicWardController {
  constructor(private readonly service: PublicWardService) {}

  @Public()
  @Get('wards')
  async getList(@Query() query: ListWardsPublicQueryDto) {
    return this.service.getList(query);
  }

  @Public()
  @Get('provinces/:provinceId/wards')
  async getByProvince(
    @Param('provinceId') provinceId: string,
    @Query() query: ListWardsPublicQueryDto,
  ) {
    return this.service.getByProvince(provinceId, query);
  }
}
