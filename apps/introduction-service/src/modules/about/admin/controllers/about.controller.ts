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
import { Permission } from '../../../../common/permission.decorator';
import { AdminAboutService } from '../services/about.service';
import { CreateAboutDto } from '../dtos/create-about.dto';
import { UpdateAboutDto } from '../dtos/update-about.dto';

@ApiTags('Admin About Sections')
@Controller('admin/about-sections')
export class AdminAboutController {
  constructor(private readonly aboutService: AdminAboutService) {}

  @Permission('introduction.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.aboutService.getList(query);
  }

  @Permission('introduction.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.aboutService.getOne(BigInt(id));
  }

  @Permission('introduction.manage')
  @Post()
  async create(@Body() dto: CreateAboutDto) {
    return this.aboutService.create(dto);
  }

  @Permission('introduction.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAboutDto) {
    return this.aboutService.update(BigInt(id), dto);
  }

  @Permission('introduction.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.aboutService.delete(BigInt(id));
  }
}
