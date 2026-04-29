import { registerAs } from '@nestjs/config';

export function createKafkaConfig(defaultGroupId?: string) {
  return registerAs('kafka', () => ({
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9093').split(','),
    enabled: process.env.EVENT_DRIVER === 'kafka',
    groupId: process.env.KAFKA_GROUP_ID || defaultGroupId || '',
  }));
}
