import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { KafkaHandler } from './kafka-handler.interface';

const EMAIL_RE = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,253}\.[A-Za-z]{2,24}$/;

@Injectable()
export class UserRegisteredHandler implements KafkaHandler {
  private readonly logger = new Logger(UserRegisteredHandler.name);

  constructor(@InjectQueue('notification') private readonly notifQueue: Queue) {}

  async handle(payload: any) {
    const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
    const username = typeof payload?.username === 'string' ? payload.username : '';
    if (!email || !EMAIL_RE.test(email) || email.length > 320) {
      this.logger.warn('user.registered: invalid email payload, dropping');
      return;
    }
    await this.notifQueue.add(
      'send_email_template',
      {
        templateCode: 'registration_success',
        options: {
          to: email,
          variables: { name: username || email, username, email },
        },
      },
      {
        attempts: 5,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 1000,
        removeOnFail: 5000,
        jobId: payload?.event_id ?? undefined,
      },
    );
  }
}
