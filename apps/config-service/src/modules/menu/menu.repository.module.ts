import { Global, Module } from '@nestjs/common';
import { MENU_REPOSITORY } from './repositories/menu.repository';
import { MenuRepositoryImpl } from './repositories/menu.repository.impl';

@Global()
@Module({
  providers: [
    {
      provide: MENU_REPOSITORY,
      useClass: MenuRepositoryImpl,
    },
  ],
  exports: [MENU_REPOSITORY],
})
export class MenuRepositoryModule {}
