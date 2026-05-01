import { Module } from '@nestjs/common';
import { GatewayComicsController } from './controllers/comics.controller';
import { GatewayChaptersController } from './controllers/chapters.controller';
import { GatewayComicsService } from './services/comics.service';

@Module({
  controllers: [GatewayComicsController, GatewayChaptersController],
  providers: [GatewayComicsService],
})
export class GatewayComicsModule {}
