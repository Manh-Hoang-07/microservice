import { Module } from '@nestjs/common';
import { PublicGeneralConfigController } from './controllers/general-config.controller';
import { PublicGeneralConfigService } from './services/general-config.service';
import { AdminGeneralConfigModule } from '../admin/general-config.module';

@Module({
  imports: [AdminGeneralConfigModule],
  controllers: [PublicGeneralConfigController],
  providers: [PublicGeneralConfigService],
})
export class PublicGeneralConfigModule {}
