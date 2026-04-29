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
import { WardService } from '../services/ward.service';
import { Permission } from '@package/common';
import { CreateWardDto } from '../dtos/create-ward.dto';
import { UpdateWardDto } from '../dtos/update-ward.dto';

@ApiTags('Location - Wards (Admin)')
@ApiBearerAuth('access-token')
@Controller('admin/wards')
export class AdminWardController {
  constructor(private readonly wardService: WardService) {}

  @Permission('ward.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.wardService.getList(query);
  }

  @Permission('ward.manage')
  @Get('simple')
  async getSimpleList(@Query() query: any) {
    return this.wardService.getSimpleList(query);
  }

  @Permission('ward.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.wardService.getOne(id);
  }

  @Permission('ward.manage')
  @Post()
  async create(@Body() dto: CreateWardDto) {
    return this.wardService.create(dto);
  }

  @Permission('ward.manage')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateWardDto) {
    return this.wardService.update(id, dto);
  }

  @Permission('ward.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.wardService.delete(id);
  }
}
