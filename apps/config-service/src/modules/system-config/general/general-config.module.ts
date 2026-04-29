import { Module } from '@nestjs/common';
import { AdminGeneralConfigModule } from './admin/general-config.module';
import { PublicGeneralConfigModule } from './public/general-config.module';
import { GeneralConfigRepositoryModule } from './general-config.repository.module';

@Module({
  imports: [GeneralConfigRepositoryModule, AdminGeneralConfigModule, PublicGeneralConfigModule],
})
export class GeneralConfigModule {}
