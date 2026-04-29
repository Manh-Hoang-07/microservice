import { initTracing } from '@package/tracing';
initTracing('auth-service');

import { AppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Auth Service',
  defaultPort: 3002,
  module: AppModule,
  swagger: {
    title: 'Auth Service',
    description: 'Authentication, Authorization and JWKS — Comic Platform',
  },
  excludePrefixes: ['.well-known/(.*)'],
}).then((app) => {
  const port = parseInt(process.env.PORT ?? '3002', 10);
  console.log(`JWKS endpoint: http://localhost:${port}/.well-known/jwks.json`);
}).catch((err) => {
  console.error('Auth Service failed to start', err);
  process.exit(1);
});
