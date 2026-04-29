import { initTracing } from '@package/tracing';
initTracing('notification-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Notification Service',
  defaultPort: 3004,
  module: AppModule,
  swagger: {
    title: 'Notification Service',
    description: 'Notification microservice — Comic Platform',
  },
}).catch((err) => {
  console.error('Notification Service failed to start', err);
  process.exit(1);
});
