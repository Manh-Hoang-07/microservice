import { Module } from '@nestjs/common';
import { InternalEmailConfigController } from './controllers/email-config.controller';
import { AdminEmailConfigModule } from '../modules/system-config/email/admin/email-config.module';

@Module({
  imports: [AdminEmailConfigModule],
  controllers: [InternalEmailConfigController],
})
export class InternalModule {}
