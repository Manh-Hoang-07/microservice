import { Module } from '@nestjs/common';
import { PublicMenuController } from './controllers/menu.controller';
import { PublicMenuService } from './services/menu.service';

@Module({
  controllers: [PublicMenuController],
  providers: [PublicMenuService],
})
export class PublicMenuModule {}
