import { Module } from '@nestjs/common';
import { AdminEmailConfigController } from './controllers/email-config.controller';
import { EmailConfigService } from './services/email-config.service';

@Module({
  controllers: [AdminEmailConfigController],
  providers: [EmailConfigService],
  exports: [EmailConfigService],
})
export class AdminEmailConfigModule {}
