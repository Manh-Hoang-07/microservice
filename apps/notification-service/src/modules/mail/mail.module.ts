import { Global, Module } from '@nestjs/common';
import { ContentTemplateModule } from '../content-template/content-template.module';
import { MailService } from './services/mail.service';

@Global()
@Module({
  imports: [ContentTemplateModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
