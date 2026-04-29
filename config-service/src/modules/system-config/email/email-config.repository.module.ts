import { Global, Module } from '@nestjs/common';
import { EMAIL_CONFIG_REPOSITORY } from './repositories/email-config.repository';
import { EmailConfigRepositoryImpl } from './repositories/email-config.repository.impl';

@Global()
@Module({
  providers: [
    { provide: EMAIL_CONFIG_REPOSITORY, useClass: EmailConfigRepositoryImpl },
  ],
  exports: [EMAIL_CONFIG_REPOSITORY],
})
export class EmailConfigRepositoryModule {}
