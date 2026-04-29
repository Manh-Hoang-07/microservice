import { Global, Module } from '@nestjs/common';
import { PROVINCE_REPOSITORY } from './repositories/province.repository';
import { ProvinceRepositoryImpl } from './repositories/province.repository.impl';

@Global()
@Module({
  providers: [
    {
      provide: PROVINCE_REPOSITORY,
      useClass: ProvinceRepositoryImpl,
    },
  ],
  exports: [PROVINCE_REPOSITORY],
})
export class ProvinceRepositoryModule {}
