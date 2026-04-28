import { Module } from '@nestjs/common';
import { GeneralConfigController } from './general-config.controller';
import { GeneralConfigService } from './general-config.service';
import { GeneralConfigRepositoryImpl } from './general-config.repository.impl';
import { GENERAL_CONFIG_REPOSITORY } from './general-config.repository';

@Module({
  controllers: [GeneralConfigController],
  providers: [
    GeneralConfigService,
    {
      provide: GENERAL_CONFIG_REPOSITORY,
      useClass: GeneralConfigRepositoryImpl,
    },
  ],
  exports: [GeneralConfigService],
})
export class GeneralConfigModule {}
