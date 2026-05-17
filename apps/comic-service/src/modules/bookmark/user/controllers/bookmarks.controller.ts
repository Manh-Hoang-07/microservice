import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { Authenticated, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserBookmarkService } from '../services/bookmarks.service';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';
import { ListBookmarksQueryDto } from '../dtos/list-bookmarks.query.dto';

@Controller('user/bookmarks')
export class UserBookmarkController {
  constructor(private readonly bookmarkService: UserBookmarkService) {}

  @Authenticated()
  @Get()
  async getList(@Query() query: ListBookmarksQueryDto) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.bookmarkService.getList(userId, query);
  }

  @Authenticated()
  @Post()
  async create(@Body() dto: CreateBookmarkDto) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.bookmarkService.create(userId, dto);
  }

  @Authenticated()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.bookmarkService.delete(userId, toPrimaryKey(id));
  }
}
