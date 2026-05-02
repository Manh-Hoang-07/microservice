import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ProvinceService } from '../../admin/services/province.service';
import { WardService } from '../../../ward/admin/services/ward.service';
import { Public } from '@package/common';
import {
  ListProvincesPublicQueryDto,
  ListProvinceWardsPublicQueryDto,
} from '../dtos/list-province.query.dto';

@Controller()
export class PublicProvinceController {
  constructor(
    private readonly provinceService: ProvinceService,
    private readonly wardService: WardService,
  ) {}

  @Public()
  @Get('provinces')
  async getList(@Query() query: ListProvincesPublicQueryDto) {
    return this.provinceService.getList({ ...query, status: 'active' });
  }

  @Public()
  @Get('countries/:countryId/provinces')
  async getByCountry(
    @Param('countryId') countryId: string,
    @Query() query: ListProvincesPublicQueryDto,
  ) {
    return this.provinceService.getList({
      ...query,
      country_id: countryId,
      status: 'active',
    });
  }

  @Public()
  @Get('provinces/:id/wards')
  async getWards(
    @Param('id') id: string,
    @Query() query: ListProvinceWardsPublicQueryDto,
  ) {
    // Previously returned the province record itself instead of its wards.
    return this.wardService.getList({
      ...query,
      province_id: id,
      status: 'active',
    });
  }
}
