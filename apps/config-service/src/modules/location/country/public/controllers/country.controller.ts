import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CountryService } from '../../admin/services/country.service';
import { Public } from '@package/common';

@Controller('countries')
export class PublicCountryController {
  constructor(private readonly countryService: CountryService) {}

  @Public()
  @Get()
  async getList(@Query() query: any) {
    return this.countryService.getList(query);
  }

  @Public()
  @Get(':id/provinces')
  async getProvinces(@Param('id') id: string, @Query() query: any) {
    return this.countryService.getOne(id);
  }
}
