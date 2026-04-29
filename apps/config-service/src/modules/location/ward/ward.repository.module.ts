import { Global, Module } from '@nestjs/common';
import { WARD_REPOSITORY } from './repositories/ward.repository';
import { WardRepositoryImpl } from './repositories/ward.repository.impl';

@Global()
@Module({
  providers: [
    {
      provide: WARD_REPOSITORY,
      useClass: WardRepositoryImpl,
    },
  ],
  exports: [WARD_REPOSITORY],
})
export class WardRepositoryModule {}
