import 'dotenv/config';
import { initTracing } from '@package/tracing';

initTracing(process.env.SERVICE_NAME ?? 'auth-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

const SERVICE_NAME = process.env.SERVICE_NAME ?? 'Auth Service';

createApp({
  serviceName: SERVICE_NAME,
  defaultPort: parseInt(process.env.PORT ?? '3001', 10),
  module: AppModule,
  excludePrefixes: ['.well-known/(.*)'],
}).catch((err) => {
  console.error(`${SERVICE_NAME} failed to start`, err);
  process.exit(1);
});
