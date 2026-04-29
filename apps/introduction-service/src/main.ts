import { initTracing } from '@package/tracing';
initTracing('introduction-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Introduction Service',
  defaultPort: 3008,
  module: AppModule,
  swagger: {
    title: 'Introduction Service',
    description: 'Introduction domain microservice — Comic Platform',
  },
}).catch((err) => {
  console.error('Introduction Service failed to start', err);
  process.exit(1);
});
