import { initTracing } from '@package/tracing';
initTracing('iam-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'IAM Service',
  defaultPort: 3008,
  module: AppModule,
}).catch((err) => {
  console.error('IAM Service failed to start', err);
  process.exit(1);
});
