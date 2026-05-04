import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@package/common';
import { PublicCountryService } from '../services/country.service';
import {
  ListCountriesPublicQueryDto,
  ListCountryProvincesPublicQueryDto,
} from '../dtos/list-country.query.dto';

@Controller('countries')
export class PublicCountryController {
  constructor(private readonly service: PublicCountryService) {}

  @Public()
  @Get()
  async getList(@Query() query: ListCountriesPublicQueryDto) {
    return this.service.getList(query);
  }

  @Public()
  @Get(':id/provinces')
  async getProvinces(
    @Param('id') id: string,
    @Query() query: ListCountryProvincesPublicQueryDto,
  ) {
    return this.service.getProvinces(id, query);
  }
}
