import { KafkaJS } from '@confluentinc/kafka-javascript';
import { KafkaSslOptions } from './kafka-client.module';

export interface KafkaInstanceOptions {
  clientId: string;
  brokers: string[];
  ssl?: KafkaSslOptions;
  retry?: { retries?: number; initialRetryTime?: number; maxRetryTime?: number };
}

export function createKafkaInstance(options: KafkaInstanceOptions): InstanceType<typeof KafkaJS.Kafka> {
  const { clientId, brokers, ssl, retry } = options;
  return new KafkaJS.Kafka({
    kafkaJS: {
      clientId,
      brokers,
      ...(retry ? { retry } : {}),
      ...(ssl ? { ssl: true } : {}),
    },
    ...(ssl ? {
      'ssl.ca.pem': ssl.ca,
      'ssl.certificate.pem': ssl.cert,
      'ssl.key.pem': ssl.key,
    } : {}),
  } as any);
}
