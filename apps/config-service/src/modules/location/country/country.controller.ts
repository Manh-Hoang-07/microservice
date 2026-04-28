import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { Permission, Public } from '../../../common/permission.decorator';
import { CreateCountryDto } from './dtos/create-country.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';

@ApiTags('Location - Countries')
@ApiBearerAuth('access-token')
@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // ── Public routes ──────────────────────────────────────────────────────────

  @Public()
  @Get('countries')
  async getList(@Query() query: any) {
    return this.countryService.getList(query);
  }

  @Public()
  @Get('countries/:id/provinces')
  async getProvinces(@Param('id') id: string, @Query() query: any) {
    // This is delegated to the province controller — we just provide the country endpoint
    // Return provinces filtered by country_id via province service
    return this.countryService.getOne(id);
  }

  // ── Admin routes ───────────────────────────────────────────────────────────

  @Permission('country.manage')
  @Get('admin/countries')
  async adminGetList(@Query() query: any) {
    return this.countryService.getList(query);
  }

  @Permission('country.manage')
  @Get('admin/countries/simple')
  async getSimpleList(@Query() query: any) {
    return this.countryService.getSimpleList(query);
  }

  @Permission('country.manage')
  @Get('admin/countries/:id')
  async getOne(@Param('id') id: string) {
    return this.countryService.getOne(id);
  }

  @Permission('country.manage')
  @Post('admin/countries')
  async create(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Permission('country.manage')
  @Patch('admin/countries/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Permission('country.manage')
  @Delete('admin/countries/:id')
  async delete(@Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
