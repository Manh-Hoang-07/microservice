import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { KafkaHandler } from './kafka-handler.interface';
import { MailService } from '../../modules/mail/services/mail.service';

@Injectable()
export class ContactSubmittedHandler implements KafkaHandler {
  private readonly logger = new Logger(ContactSubmittedHandler.name);

  constructor(
    @InjectQueue('notification') private readonly notifQueue: Queue,
    private readonly mailService: MailService,
  ) {}

  async handle(payload: any) {
    // CRITICAL: read the admin recipient from config-service, NOT from the
    // event payload. Trusting `payload.admin_email` lets anyone with Kafka
    // produce permission redirect contact-form notifications anywhere.
    const adminEmail = this.mailService.getAdminEmail();
    if (!adminEmail) {
      this.logger.warn('No admin email configured; dropping contact.submitted notification');
      return;
    }

    // Whitelist payload variables exposed to the template so a malicious
    // event cannot smuggle extra fields the template renders unsafely.
    const safeVars = {
      name: typeof payload?.name === 'string' ? payload.name : '',
      email: typeof payload?.email === 'string' ? payload.email : '',
      phone: typeof payload?.phone === 'string' ? payload.phone : '',
      subject: typeof payload?.subject === 'string' ? payload.subject : '',
      message: typeof payload?.message === 'string' ? payload.message : '',
    };

    await this.notifQueue.add(
      'send_email_template',
      {
        templateCode: 'contact_submitted',
        options: { to: adminEmail, variables: safeVars },
      },
      {
        attempts: 5,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 1000,
        removeOnFail: 5000,
        // Idempotency: same payload → same job id → Bull dedups within TTL.
        jobId: payload?.event_id ?? payload?.id ?? undefined,
      },
    );
  }
}
