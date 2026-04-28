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
import { ProvinceService } from './province.service';
import { Permission, Public } from '../../../common/permission.decorator';
import { CreateProvinceDto } from './dtos/create-province.dto';
import { UpdateProvinceDto } from './dtos/update-province.dto';

@ApiTags('Location - Provinces')
@ApiBearerAuth('access-token')
@Controller()
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  // ── Public routes ──────────────────────────────────────────────────────────

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

  // ── Admin routes ───────────────────────────────────────────────────────────

  @Permission('province.manage')
  @Get('admin/provinces')
  async adminGetList(@Query() query: any) {
    return this.provinceService.getList(query);
  }

  @Permission('province.manage')
  @Get('admin/provinces/simple')
  async getSimpleList(@Query() query: any) {
    return this.provinceService.getSimpleList(query);
  }

  @Permission('province.manage')
  @Get('admin/provinces/:id')
  async getOne(@Param('id') id: string) {
    return this.provinceService.getOne(id);
  }

  @Permission('province.manage')
  @Post('admin/provinces')
  async create(@Body() dto: CreateProvinceDto) {
    return this.provinceService.create(dto);
  }

  @Permission('province.manage')
  @Patch('admin/provinces/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateProvinceDto) {
    return this.provinceService.update(id, dto);
  }

  @Permission('province.manage')
  @Delete('admin/provinces/:id')
  async delete(@Param('id') id: string) {
    return this.provinceService.delete(id);
  }
}
