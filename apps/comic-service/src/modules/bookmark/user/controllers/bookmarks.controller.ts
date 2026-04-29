import { Controller, Get, Post, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { UserBookmarkService } from '../services/bookmarks.service';
import { CreateBookmarkDto } from '../dtos/create-bookmark.dto';

@ApiTags('User Bookmarks')
@Controller('user/bookmarks')
export class UserBookmarkController {
  constructor(private readonly bookmarkService: UserBookmarkService) {}

  @Permission('user')
  @Get()
  async getList(@Req() req: any, @Query() query: any) {
    const userId = BigInt(req.user.sub);
    return this.bookmarkService.getList(userId, query);
  }

  @Permission('user')
  @Post()
  async create(@Req() req: any, @Body() dto: CreateBookmarkDto) {
    const userId = BigInt(req.user.sub);
    return this.bookmarkService.create(userId, dto);
  }

  @Permission('user')
  @Delete(':id')
  async delete(@Req() req: any, @Param('id') id: string) {
    const userId = BigInt(req.user.sub);
    return this.bookmarkService.delete(userId, BigInt(id));
  }
}
