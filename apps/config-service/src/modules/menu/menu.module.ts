import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuRepositoryImpl } from './menu.repository.impl';
import { MENU_REPOSITORY } from './menu.repository';

@Module({
  controllers: [MenuController],
  providers: [
    MenuService,
    {
      provide: MENU_REPOSITORY,
      useClass: MenuRepositoryImpl,
    },
  ],
  exports: [MenuService],
})
export class MenuModule {}
