import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { AdminBannerService } from '../services/banner.service';
import { CreateBannerDto } from '../dtos/create-banner.dto';
import { UpdateBannerDto } from '../dtos/update-banner.dto';

@ApiTags('Admin Banners')
@Controller('admin/banners')
export class AdminBannerController {
  constructor(private readonly bannerService: AdminBannerService) {}

  @Permission('marketing.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.bannerService.getList(query);
  }

  @Permission('marketing.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.bannerService.getOne(BigInt(id));
  }

  @Permission('marketing.manage')
  @Post()
  async create(@Body() dto: CreateBannerDto) {
    return this.bannerService.create(dto);
  }

  @Permission('marketing.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBannerDto) {
    return this.bannerService.update(BigInt(id), dto);
  }

  @Permission('marketing.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bannerService.delete(BigInt(id));
  }
}
