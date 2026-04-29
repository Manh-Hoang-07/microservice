import { Module } from '@nestjs/common';
import { PublicGeneralConfigController } from './controllers/general-config.controller';
import { AdminGeneralConfigModule } from '../admin/general-config.module';

@Module({
  imports: [AdminGeneralConfigModule],
  controllers: [PublicGeneralConfigController],
})
export class PublicGeneralConfigModule {}
