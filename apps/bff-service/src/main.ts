import { initTracing } from '@package/tracing';
initTracing('bff-service');

import { BffAppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'BFF Service',
  defaultPort: 3006,
  module: BffAppModule,
  swagger: {
    title: 'BFF Service',
    description: 'Backend-for-Frontend — Homepage aggregation',
  },
}).catch((err) => {
  console.error('BFF Service failed to start', err);
  process.exit(1);
});
