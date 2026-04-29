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
import { AdminComicService } from '../services/comic.service';
import { CreateComicDto } from '../dtos/create-comic.dto';
import { UpdateComicDto } from '../dtos/update-comic.dto';

@ApiTags('Admin Comics')
@Controller('admin/comics')
export class AdminComicController {
  constructor(private readonly comicService: AdminComicService) {}

  @Permission('comic.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.comicService.getList(query);
  }

  @Permission('comic.manage')
  @Get('simple')
  async getSimpleList(@Query() query: any) {
    return this.comicService.getSimpleList(query);
  }

  @Permission('comic.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.comicService.getOne(BigInt(id));
  }

  @Permission('comic.manage')
  @Post()
  async create(@Body() dto: CreateComicDto) {
    return this.comicService.create(dto);
  }

  @Permission('comic.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateComicDto) {
    return this.comicService.update(BigInt(id), dto);
  }

  @Permission('comic.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.comicService.delete(BigInt(id));
  }
}
