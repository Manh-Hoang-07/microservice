import { Controller, Get, Post, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserReadingHistoryService } from '../services/reading-history.service';

@ApiTags('User Reading History')
@Controller('user/reading-history')
export class UserReadingHistoryController {
  constructor(private readonly historyService: UserReadingHistoryService) {}

  @Permission('user')
  @Get()
  async getList(@Req() req: any, @Query() query: any) {
    const userId = toPrimaryKey(req.user.sub);
    return this.historyService.getList(userId, query);
  }

  @Permission('user')
  @Post()
  async upsert(@Req() req: any, @Body() body: { comic_id: number; chapter_id: number }) {
    const userId = toPrimaryKey(req.user.sub);
    return this.historyService.upsert(userId, toPrimaryKey(body.comic_id), toPrimaryKey(body.chapter_id));
  }

  @Permission('user')
  @Delete(':comicId')
  async clear(@Req() req: any, @Param('comicId') comicId: string) {
    const userId = toPrimaryKey(req.user.sub);
    return this.historyService.clear(userId, toPrimaryKey(comicId));
  }
}
