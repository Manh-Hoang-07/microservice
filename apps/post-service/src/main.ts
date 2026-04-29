import { initTracing } from '@package/tracing';
initTracing('post-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Post Service',
  defaultPort: 3007,
  module: AppModule,
  swagger: {
    title: 'Post Service',
    description: 'Post domain microservice — Blog Platform',
  },
}).catch((err) => {
  console.error('Post Service failed to start', err);
  process.exit(1);
});
