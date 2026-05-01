import { Controller, Get, Post, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Permission } from '@package/common';
import { UserReadingHistoryService } from '../services/reading-history.service';

@ApiTags('User Reading History')
@Controller('user/reading-history')
export class UserReadingHistoryController {
  constructor(private readonly historyService: UserReadingHistoryService) {}

  @Permission('user')
  @Get()
  async getList(@Req() req: any, @Query() query: any) {
    return this.historyService.getList(req.user.sub, query);
  }

  @Permission('user')
  @Post()
  async upsert(@Req() req: any, @Body() body: { comic_id: number; chapter_id: number }) {
    return this.historyService.upsert(req.user.sub, body.comic_id, body.chapter_id);
  }

  @Permission('user')
  @Delete(':comicId')
  async clear(@Req() req: any, @Param('comicId') comicId: string) {
    return this.historyService.clear(req.user.sub, comicId);
  }
}
