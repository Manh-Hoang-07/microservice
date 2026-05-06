import { registerAs } from '@nestjs/config';

function readEnvPem(key: string): string | undefined {
  const val = process.env[key];
  return val ? val.replace(/\\n/g, '\n') : undefined;
}

export function createKafkaConfig(defaultGroupId?: string) {
  return registerAs('kafka', () => {
    const ca = readEnvPem('KAFKA_CA_CERTIFICATE');
    const cert = readEnvPem('KAFKA_ACCESS_CERTIFICATE');
    const key = readEnvPem('KAFKA_ACCESS_KEY');

    return {
      brokers: (process.env.KAFKA_BROKERS || 'localhost:9093').split(','),
      enabled: process.env.EVENT_DRIVER === 'kafka',
      groupId: process.env.KAFKA_GROUP_ID || defaultGroupId || '',
      replicationFactor: parseInt(process.env.KAFKA_REPLICATION_FACTOR || '1', 10),
      ssl: ca && cert && key ? { rejectUnauthorized: true, ca, cert, key } : undefined,
    };
  });
}
