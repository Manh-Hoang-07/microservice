import { Controller, Get, Post, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { Permission } from '@package/common';
import { UserBookmarkService } from '../services/bookmarks.service';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
import { ListBookmarksQueryDto } from '../dtos/list-bookmarks.query.dto';

@Controller('user/bookmarks')
export class UserBookmarkController {
  constructor(private readonly bookmarkService: UserBookmarkService) {}

  @Permission('user')
  @Get()
  async getList(@Req() req: any, @Query() query: ListBookmarksQueryDto) {
    return this.bookmarkService.getList(req.user.sub, query);
  }

  @Permission('user')
  @Post()
  async create(@Req() req: any, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.create(req.user.sub, dto);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string) {
    return this.bookmarkService.delete(req.user.sub, id);
  }
}
