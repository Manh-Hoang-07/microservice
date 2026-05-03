import { Module } from '@nestjs/common';
import { UserBookmarkController } from './user/controllers/bookmarks.controller';
import { UserBookmarkService } from './user/services/bookmarks.service';
import { BookmarkRepository } from './repositories/bookmark.repository';

@Module({
  controllers: [UserBookmarkController],
  providers: [BookmarkRepository, UserBookmarkService],
  exports: [BookmarkRepository],
})
export class BookmarkModule {}
