import { Controller, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { AdminComicService } from '../services/comic.service';
import { CreateComicDto } from '../dtos/create-comic.dto';
import { UpdateComicDto } from '../dtos/update-comic.dto';
import { ListComicsAdminQueryDto } from '../dtos/list-comics.query.dto';

@Controller('admin/comics')
export class AdminComicController {
  constructor(private readonly comicService: AdminComicService) {}

  @Permission('comic.manage')
  @Get()
  async getList(@Query() query: ListComicsAdminQueryDto) {
    return this.comicService.getList(query);
  }

  @Permission('comic.manage')
  @Get('simple')
  async getSimpleList(@Query() query: ListComicsAdminQueryDto) {
    return this.comicService.getSimpleList(query);
  }

  @Permission('comic.manage')
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.comicService.getOne(toPrimaryKey(id));
  }

  @Permission('comic.manage')
  @Post()
  async create(@Body() dto: CreateComicDto, @Req() req: Request) {
    const actorId = (req as any).user?.sub ? toPrimaryKey((req as any).user.sub) : undefined;
    return this.comicService.create(dto, actorId);
  }

  @Permission('comic.manage')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateComicDto, @Req() req: Request) {
    const actorId = (req as any).user?.sub ? toPrimaryKey((req as any).user.sub) : undefined;
    return this.comicService.update(toPrimaryKey(id), dto, actorId);
  }

  @Permission('comic.manage')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.comicService.delete(toPrimaryKey(id));
  }
}
