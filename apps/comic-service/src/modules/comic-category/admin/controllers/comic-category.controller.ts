import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { AdminCategoryService } from '../services/comic-category.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@ApiTags('Admin Comic Categories')
@Controller('admin/comic-categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: AdminCategoryService) {}

  @Permission('comic.manage')
  @Get()
  async getList(@Query() query: any) {
    return this.categoryService.getList(query);
  }

  @Permission('comic.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.getOne(BigInt(id));
  }

  @Permission('comic.manage')
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Permission('comic.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(BigInt(id), dto);
  }

  @Permission('comic.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(BigInt(id));
  }
}
