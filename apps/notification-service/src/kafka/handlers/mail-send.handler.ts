import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { KafkaHandler } from './kafka-handler.interface';

@Injectable()
export class MailSendHandler implements KafkaHandler {
  constructor(@InjectQueue('notification') private readonly notifQueue: Queue) {}

  async handle(payload: any) {
    const { to, templateCode, variables } = payload;
    if (!to || !templateCode) return;
    await this.notifQueue.add(
      'send_email_template',
      { templateCode, options: { to, variables: variables || {} } },
      { attempts: 3, backoff: 5000, removeOnComplete: true },
    );
  }
}
