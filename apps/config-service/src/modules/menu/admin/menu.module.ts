import { Module } from '@nestjs/common';
import { AdminMenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';

@Module({
  controllers: [AdminMenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class AdminMenuModule {}
