import { Module } from '@nestjs/common';
import { EmailConfigController } from './email-config.controller';
import { EmailConfigService } from './email-config.service';
import { EmailConfigRepositoryImpl } from './email-config.repository.impl';
import { EMAIL_CONFIG_REPOSITORY } from './email-config.repository';

@Module({
  controllers: [EmailConfigController],
  providers: [
    EmailConfigService,
    {
      provide: EMAIL_CONFIG_REPOSITORY,
      useClass: EmailConfigRepositoryImpl,
    },
  ],
  exports: [EmailConfigService],
})
export class EmailConfigModule {}
