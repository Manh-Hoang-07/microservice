import { Module } from '@nestjs/common';
import { UserReadingHistoryController } from './user/controllers/reading-history.controller';
import { UserReadingHistoryService } from './user/services/reading-history.service';

@Module({
  controllers: [UserReadingHistoryController],
  providers: [UserReadingHistoryService],
})
export class ReadingHistoryModule {}
