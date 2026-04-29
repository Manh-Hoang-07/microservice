import { Module } from '@nestjs/common';
import { UserBookmarkController } from './user/controllers/bookmarks.controller';
import { UserBookmarkService } from './user/services/bookmarks.service';

@Module({
  controllers: [UserBookmarkController],
  providers: [UserBookmarkService],
})
export class BookmarkModule {}
