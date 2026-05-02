import { initTracing } from '@package/tracing';
initTracing('storage-service');

import { StorageAppModule } from './app.module';
import { createApp } from '@package/bootstrap';

createApp({
  serviceName: 'Storage Service',
  defaultPort: 3003,
  module: StorageAppModule,
}).catch((err) => {
  console.error('Storage Service failed to start', err);
  process.exit(1);
});
