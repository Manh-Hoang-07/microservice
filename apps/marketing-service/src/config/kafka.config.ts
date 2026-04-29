import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => ({
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9093').split(','),
  enabled: process.env.EVENT_DRIVER === 'kafka',
}));
