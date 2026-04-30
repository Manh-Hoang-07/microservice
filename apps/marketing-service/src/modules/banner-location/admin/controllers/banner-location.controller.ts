import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminBannerLocationService } from '../services/banner-location.service';
import { CreateBannerLocationDto } from '../dtos/create-banner-location.dto';
import { UpdateBannerLocationDto } from '../dtos/update-banner-location.dto';

@ApiTags('Admin Banner Locations')
@Controller('admin/banner-locations')
export class AdminBannerLocationController {
  constructor(private readonly bannerLocationService: AdminBannerLocationService) {}

  @Permission('marketing.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.bannerLocationService.getList(query);
  }

  @Permission('marketing.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.bannerLocationService.getOne(toPrimaryKey(id));
  }

  @Permission('marketing.manage')
  @Post()
  async create(@Body() dto: CreateBannerLocationDto) {
    return this.bannerLocationService.create(dto);
  }

  @Permission('marketing.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBannerLocationDto) {
    return this.bannerLocationService.update(toPrimaryKey(id), dto);
  }

  @Permission('marketing.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bannerLocationService.delete(toPrimaryKey(id));
  }

  @Permission('marketing.manage')
  @Patch(':id/status')
  async changeStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.bannerLocationService.changeStatus(toPrimaryKey(id), status);
  }
}
