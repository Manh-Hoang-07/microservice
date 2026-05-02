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
import { CountryService } from '../services/country.service';
import { Permission } from '@package/common';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { UpdateCountryDto } from '../dtos/update-country.dto';

@Controller('admin/countries')
export class AdminCountryController {
  constructor(private readonly countryService: CountryService) {}

  @Permission('country.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.countryService.getList(query);
  }

  @Permission('country.manage')
  @Get('simple')
  async getSimpleList(@Query() query: any) {
    return this.countryService.getSimpleList(query);
  }

  @Permission('country.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.countryService.getOne(id);
  }

  @Permission('country.manage')
  @Post()
  async create(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Permission('country.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Permission('country.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
