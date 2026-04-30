import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from '../../modules/mail/services/mail.service';

@Processor('notification')
export class NotificationProcessor {
  constructor(private readonly mail: MailService) {}

  @Process({ name: 'send_email_template', concurrency: 5 })
  async handleSendEmail(job: Job) {
    const { templateCode, options } = job.data;
    await this.mail.sendTemplate(templateCode, options);
  }
}
