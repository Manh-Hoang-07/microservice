import { Module } from '@nestjs/common';
import { InternalEmailConfigController } from './controllers/email-config.controller';
import { AdminEmailConfigModule } from '../admin/email-config.module';

@Module({
  imports: [AdminEmailConfigModule],
  controllers: [InternalEmailConfigController],
})
export class InternalEmailConfigModule {}
