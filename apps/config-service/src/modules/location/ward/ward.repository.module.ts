import { Global, Module } from '@nestjs/common';
import { WardRepository } from './repositories/ward.repository';

@Global()
@Module({
  providers: [WardRepository],
  exports: [WardRepository],
})
export class WardRepositoryModule {}
