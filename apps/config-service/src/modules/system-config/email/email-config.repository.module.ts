import { Global, Module } from '@nestjs/common';
import { EmailConfigRepository } from './repositories/email-config.repository';

@Global()
@Module({
  providers: [EmailConfigRepository],
  exports: [EmailConfigRepository],
})
export class EmailConfigRepositoryModule {}
