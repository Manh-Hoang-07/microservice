import { initTracing } from '@package/tracing';
initTracing('iam-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'IAM Service',
  defaultPort: 3008,
  module: AppModule,
  swagger: {
    title: 'IAM Service',
    description: 'Identity and Access Management — roles, permissions, groups, contexts',
  },
}).catch((err) => {
  console.error('IAM Service failed to start', err);
  process.exit(1);
});
