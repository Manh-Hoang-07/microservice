import 'dotenv/config';
import { initTracing } from '@package/tracing';

initTracing(process.env.SERVICE_NAME ?? 'gateway-service');

import { GatewayAppModule } from './app.module';
import { createApp } from '@package/bootstrap';

const SERVICE_NAME = process.env.SERVICE_NAME ?? 'Gateway Service';

createApp({
  serviceName: SERVICE_NAME,
  defaultPort: parseInt(process.env.PORT ?? '3006', 10),
  module: GatewayAppModule,
}).catch((err) => {
  console.error(`${SERVICE_NAME} failed to start`, err);
  process.exit(1);
});
