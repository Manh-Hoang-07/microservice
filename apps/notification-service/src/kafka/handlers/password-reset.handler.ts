import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { KafkaHandler } from './kafka-handler.interface';

@Injectable()
export class PasswordResetHandler implements KafkaHandler {
  constructor(@InjectQueue('notification') private readonly notifQueue: Queue) {}

  async handle(payload: any) {
    const { email, username } = payload;
    if (!email) return;
    await this.notifQueue.add(
      'send_email_template',
      {
        templateCode: 'reset_password_success',
        options: { to: email, variables: { name: username || email, time: new Date().toLocaleString('vi-VN') } },
      },
      { attempts: 3, backoff: 5000, removeOnComplete: true },
    );
  }
}
