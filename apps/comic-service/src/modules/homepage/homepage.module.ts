import { Module } from '@nestjs/common';
import { HomepageController } from './controllers/homepage.controller';
import { HomepageService } from './services/homepage.service';

@Module({
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule {}
