import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { KafkaHandler } from './kafka-handler.interface';

// Conservative RFC-5322 subset; matches mail-send.handler.ts so any
// attacker-supplied email is rejected before reaching nodemailer.
const EMAIL_RE = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,24}$/;

@Injectable()
export class PasswordResetHandler implements KafkaHandler {
  private readonly logger = new Logger(PasswordResetHandler.name);

  constructor(@InjectQueue('notification') private readonly notifQueue: Queue) {}

  async handle(payload: any) {
    const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
    const username = typeof payload?.username === 'string' ? payload.username : '';
    if (!email || !EMAIL_RE.test(email) || email.length > 320) {
      this.logger.warn('user.password.reset: invalid email payload, dropping');
      return;
    }
    await this.notifQueue.add(
      'send_email_template',
      {
        templateCode: 'reset_password_success',
        options: {
          to: email,
          variables: {
            name: username || email,
            time: new Date().toLocaleString('vi-VN'),
          },
        },
      },
      {
        attempts: 5,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 1000,
        removeOnFail: 5000,
        // Idempotency: same event_id → Bull dedups within retention.
        jobId: payload?.event_id ?? undefined,
      },
    );
  }
}
