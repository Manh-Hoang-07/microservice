import { initTracing } from '@package/tracing';
initTracing('config-service');

import { ConfigAppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Config Service',
  defaultPort: 3005,
  module: ConfigAppModule,
  swagger: {
    title: 'Config Service',
    description: 'System configuration, menu, and location microservice — Comic Platform',
  },
}).catch((err) => {
  console.error('Config Service failed to start', err);
  process.exit(1);
});
