import { initTracing } from '@package/tracing';
initTracing('comic-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Comic Service',
  defaultPort: 3001,
  module: AppModule,
  swagger: {
    title: 'Comic Service',
    description: 'Comic domain microservice — Comic Platform',
  },
}).catch((err) => {
  console.error('Comic Service failed to start', err);
  process.exit(1);
});
