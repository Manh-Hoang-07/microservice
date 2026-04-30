import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { KafkaHandler } from './kafka-handler.interface';

@Injectable()
export class UserRegisteredHandler implements KafkaHandler {
  constructor(@InjectQueue('notification') private readonly notifQueue: Queue) {}

  async handle(payload: any) {
    const { email, username } = payload;
    if (!email) return;
    await this.notifQueue.add(
      'send_email_template',
      { templateCode: 'registration_success', options: { to: email, variables: { name: username || email, username, email } } },
      { attempts: 3, backoff: 5000, removeOnComplete: true },
    );
  }
}
