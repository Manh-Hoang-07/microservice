import { Module } from '@nestjs/common';
import { HomepageController } from './controllers/homepage.controller';
import { HomepageService } from './services/homepage.service';
import { HomepageRepository } from './repositories/homepage.repository';

@Module({
  controllers: [HomepageController],
  providers: [HomepageRepository, HomepageService],
})
export class HomepageModule {}
