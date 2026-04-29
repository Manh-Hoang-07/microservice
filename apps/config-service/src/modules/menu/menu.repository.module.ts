import { Global, Module } from '@nestjs/common';
import { MenuRepository } from './repositories/menu.repository';

@Global()
@Module({
  providers: [MenuRepository],
  exports: [MenuRepository],
})
export class MenuRepositoryModule {}
