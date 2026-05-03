import { Global, Module } from '@nestjs/common';
import { GeneralConfigRepository } from './repositories/general-config.repository';

@Global()
@Module({
  providers: [GeneralConfigRepository],
  exports: [GeneralConfigRepository],
})
export class GeneralConfigRepositoryModule {}
