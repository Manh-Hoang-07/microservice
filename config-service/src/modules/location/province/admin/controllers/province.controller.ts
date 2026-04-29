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
import { ProvinceService } from '../services/province.service';
import { Permission } from '../../../../../common/permission.decorator';
import { CreateProvinceDto } from '../dtos/create-province.dto';
import { UpdateProvinceDto } from '../dtos/update-province.dto';

@ApiTags('Location - Provinces (Admin)')
@ApiBearerAuth('access-token')
@Controller('admin/provinces')
export class AdminProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Permission('province.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.provinceService.getList(query);
  }

  @Permission('province.manage')
  @Get('simple')
  async getSimpleList(@Query() query: any) {
    return this.provinceService.getSimpleList(query);
  }

  @Permission('province.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.provinceService.getOne(id);
  }

  @Permission('province.manage')
  @Post()
  async create(@Body() dto: CreateProvinceDto) {
    return this.provinceService.create(dto);
  }

  @Permission('province.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProvinceDto) {
    return this.provinceService.update(id, dto);
  }

  @Permission('province.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.provinceService.delete(id);
  }
}
