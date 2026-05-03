import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService, PermanentMailError } from '../../modules/mail/services/mail.service';

@Processor('notification')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private readonly mail: MailService) {}

  @Process({ name: 'send_email_template', concurrency: 5 })
  async handleSendEmail(job: Job) {
    const { templateCode, options } = job.data;
    try {
      await this.mail.sendTemplate(templateCode, options);
    } catch (err) {
      if (err instanceof PermanentMailError) {
        // Bull retries on every thrown error. Tell it not to bother — this
        // is a hard bounce / auth failure / malformed envelope. The job
        // will fail immediately with this reason logged on attemptsMade=1.
        this.logger.warn(
          `Permanent mail failure for ${templateCode}: ${err.message} — not retrying`,
        );
        // Bull doesn't have an "attempts: 1" override per-error API. The
        // standard pattern is to mark moveToFailed and re-throw. Setting
        // attemptsMade triggers Bull's terminal-fail path.
        await job.moveToFailed(
          { message: err.message },
          true /* ignoreLock */,
        );
        return;
      }
      throw err;
    }
  }
}
