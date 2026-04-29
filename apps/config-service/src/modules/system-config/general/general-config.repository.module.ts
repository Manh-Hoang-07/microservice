import { Global, Module } from '@nestjs/common';
import { GENERAL_CONFIG_REPOSITORY } from './repositories/general-config.repository';
import { GeneralConfigRepositoryImpl } from './repositories/general-config.repository.impl';

@Global()
@Module({
  providers: [
    { provide: GENERAL_CONFIG_REPOSITORY, useClass: GeneralConfigRepositoryImpl },
  ],
  exports: [GENERAL_CONFIG_REPOSITORY],
})
export class GeneralConfigRepositoryModule {}
