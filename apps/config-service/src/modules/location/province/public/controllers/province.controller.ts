import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicProvinceService } from '../services/province.service';
import {
  ListProvincesPublicQueryDto,
  ListProvinceWardsPublicQueryDto,
} from '../dtos/list-province.query.dto';

@Controller()
export class PublicProvinceController {
  constructor(private readonly service: PublicProvinceService) {}

  @Public()
  @Get('provinces')
  async getList(@Query() query: ListProvincesPublicQueryDto) {
    return this.service.getList(query);
  }

  @Public()
  @Get('countries/:countryId/provinces')
  async getByCountry(
    @Param('countryId') countryId: string,
    @Query() query: ListProvincesPublicQueryDto,
  ) {
    return this.service.getByCountry(countryId, query);
  }

  @Public()
  @Get('provinces/:id/wards')
  async getWards(
    @Param('id') id: string,
    @Query() query: ListProvinceWardsPublicQueryDto,
  ) {
    return this.service.getWards(id, query);
  }
}
