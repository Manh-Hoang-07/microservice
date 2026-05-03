import { initTracing } from '@package/tracing';
initTracing('auth-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Auth Service',
  defaultPort: 3002,
  module: AppModule,
  excludePrefixes: ['.well-known/(.*)'],
}).catch((err) => {
  console.error('Auth Service failed to start', err);
  process.exit(1);
});
