import { Module } from '@nestjs/common';
import { GatewaySearchController } from './controllers/search.controller';
import { GatewaySearchService } from './services/search.service';

@Module({
  controllers: [GatewaySearchController],
  providers: [GatewaySearchService],
})
export class GatewaySearchModule {}
