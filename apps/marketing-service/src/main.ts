import { initTracing } from '@package/tracing';
initTracing('marketing-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Marketing Service',
  defaultPort: 3009,
  module: AppModule,
  swagger: {
    title: 'Marketing Service',
    description: 'Marketing domain microservice — Comic Platform',
  },
}).catch((err) => {
  console.error('Marketing Service failed to start', err);
  process.exit(1);
});
