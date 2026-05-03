import { Module } from '@nestjs/common';
import { AdminGeneralConfigController } from './controllers/general-config.controller';
import { GeneralConfigService } from './services/general-config.service';

@Module({
  controllers: [AdminGeneralConfigController],
  providers: [GeneralConfigService],
  exports: [GeneralConfigService],
})
export class AdminGeneralConfigModule {}
