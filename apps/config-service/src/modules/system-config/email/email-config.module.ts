import { Module } from '@nestjs/common';
import { AdminEmailConfigModule } from './admin/email-config.module';
import { InternalEmailConfigModule } from './internal/email-config.module';
import { EmailConfigRepositoryModule } from './email-config.repository.module';

@Module({
  imports: [EmailConfigRepositoryModule, AdminEmailConfigModule, InternalEmailConfigModule],
})
export class EmailConfigModule {}
