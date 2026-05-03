import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CountryService } from '../../admin/services/country.service';
import { ProvinceService } from '../../../province/admin/services/province.service';
import { Public } from '@package/common';
import {
  ListCountriesPublicQueryDto,
  ListCountryProvincesPublicQueryDto,
} from '../dtos/list-country.query.dto';

@Controller('countries')
export class PublicCountryController {
  constructor(
    private readonly countryService: CountryService,
    private readonly provinceService: ProvinceService,
  ) {}

  @Public()
  @Get()
  async getList(@Query() query: ListCountriesPublicQueryDto) {
    // Force status=active regardless of caller-supplied filter.
    return this.countryService.getList({ ...query, status: 'active' });
  }

  @Public()
  @Get(':id/provinces')
  async getProvinces(
    @Param('id') id: string,
    @Query() query: ListCountryProvincesPublicQueryDto,
  ) {
    // Previously returned the parent country instead of its provinces.
    return this.provinceService.getList({
      ...query,
      country_id: id,
      status: 'active',
    });
  }
}
