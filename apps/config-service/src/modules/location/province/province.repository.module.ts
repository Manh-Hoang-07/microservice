import { Global, Module } from '@nestjs/common';
import { ProvinceRepository } from './repositories/province.repository';

@Global()
@Module({
  providers: [ProvinceRepository],
  exports: [ProvinceRepository],
})
export class ProvinceRepositoryModule {}
