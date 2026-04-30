import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { KafkaHandler } from './kafka-handler.interface';

@Injectable()
export class ContactSubmittedHandler implements KafkaHandler {
  constructor(@InjectQueue('notification') private readonly notifQueue: Queue) {}

  async handle(payload: any) {
    await this.notifQueue.add(
      'send_email_template',
      { templateCode: 'contact_submitted', options: { to: payload.admin_email, variables: payload } },
      { attempts: 3, backoff: 5000, removeOnComplete: true },
    );
  }
}
