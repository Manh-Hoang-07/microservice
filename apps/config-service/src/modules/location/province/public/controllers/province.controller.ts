import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ProvinceService } from '../../admin/services/province.service';
import { Public } from '@package/common';

@Controller()
export class PublicProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Public()
  @Get('provinces')
  async getList(@Query() query: any) {
    return this.provinceService.getList(query);
  }

  @Public()
  @Get('countries/:countryId/provinces')
  async getByCountry(@Param('countryId') countryId: string, @Query() query: any) {
    return this.provinceService.getList({ ...query, country_id: countryId });
  }

  @Public()
  @Get('provinces/:id/wards')
  async getWards(@Param('id') id: string) {
    return this.provinceService.getOne(id);
  }
}
