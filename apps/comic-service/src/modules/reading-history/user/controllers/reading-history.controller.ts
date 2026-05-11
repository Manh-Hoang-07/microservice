import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { Permission, session } from '@package/common';
import { toPrimaryKey } from 'src/types';
import { UserReadingHistoryService } from '../services/reading-history.service';
import { ListReadingHistoryQueryDto } from '../dtos/list-reading-history.query.dto';

@Controller('user/reading-history')
export class UserReadingHistoryController {
  constructor(private readonly historyService: UserReadingHistoryService) {}

  @Permission('user')
  @Get()
  async getList(@Query() query: ListReadingHistoryQueryDto) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.historyService.getList(userId, query);
  }

  @Permission('user')
  @Post()
  async upsert(@Body() body: { comic_id: number; chapter_id: number }) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.historyService.upsert(userId, toPrimaryKey(body.comic_id), toPrimaryKey(body.chapter_id));
  }

  @Permission('user')
  @Delete(':comicId')
  async clear(@Param('comicId') comicId: string) {
    const userId = toPrimaryKey(session()!.userId!);
    return this.historyService.clear(userId, toPrimaryKey(comicId));
  }
}
