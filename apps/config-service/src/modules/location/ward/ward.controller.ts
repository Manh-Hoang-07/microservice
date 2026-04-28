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
import { WardService } from './ward.service';
import { Permission, Public } from '../../../common/permission.decorator';
import { CreateWardDto } from './dtos/create-ward.dto';
import { UpdateWardDto } from './dtos/update-ward.dto';

@ApiTags('Location - Wards')
@ApiBearerAuth('access-token')
@Controller()
export class WardController {
  constructor(private readonly wardService: WardService) {}

  // ── Public routes ──────────────────────────────────────────────────────────

  @Public()
  @Get('wards')
  async getList(@Query() query: any) {
    return this.wardService.getList(query);
  }

  @Public()
  @Get('provinces/:provinceId/wards')
  async getByProvince(
    @Param('provinceId') provinceId: string,
    @Query() query: any,
  ) {
    return this.wardService.getList({ ...query, province_id: provinceId });
  }

  // ── Admin routes ───────────────────────────────────────────────────────────

  @Permission('ward.manage')
  @Get('admin/wards')
  async adminGetList(@Query() query: any) {
    return this.wardService.getList(query);
  }

  @Permission('ward.manage')
  @Get('admin/wards/simple')
  async getSimpleList(@Query() query: any) {
    return this.wardService.getSimpleList(query);
  }

  @Permission('ward.manage')
  @Get('admin/wards/:id')
  async getOne(@Param('id') id: string) {
    return this.wardService.getOne(id);
  }

  @Permission('ward.manage')
  @Post('admin/wards')
  async create(@Body() dto: CreateWardDto) {
    return this.wardService.create(dto);
  }

  @Permission('ward.manage')
  @Patch('admin/wards/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateWardDto) {
    return this.wardService.update(id, dto);
  }

  @Permission('ward.manage')
  @Delete('admin/wards/:id')
  async delete(@Param('id') id: string) {
    return this.wardService.delete(id);
  }
}
