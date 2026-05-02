import { Module } from '@nestjs/common';
import { HomepageController } from './controllers/homepage.controller';
import { GatewayHomepageService } from './services/homepage.service';

@Module({
  controllers: [HomepageController],
  providers: [GatewayHomepageService],
})
export class GatewayHomepageModule {}
