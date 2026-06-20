import './register'; // Must be first — patches Module._resolveFilename for src/* paths
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createApp } from '@package/bootstrap';

const MONOLITH_DIR = path.resolve(__dirname, '..');

// Load monolith env files ONCE at startup.
// Priority: .env → .env.{NODE_ENV} → .env.local
// NODE_ENV from process (cross-env/Docker) always wins.
(function loadMonolithEnv() {
  const externalNodeEnv = process.env.NODE_ENV;
  for (const file of ['.env', externalNodeEnv ? `.env.${externalNodeEnv}` : null, '.env.local']) {
    if (!file) continue;
    try {
      Object.assign(process.env, dotenv.parse(fs.readFileSync(path.join(MONOLITH_DIR, file), 'utf8')));
    } catch (_) {}
  }
  if (externalNodeEnv) process.env.NODE_ENV = externalNodeEnv;
})();

// Before each service import, map AUTH_SERVICE_DATABASE_URL → DATABASE_URL etc.
function useService(serviceName: string) {
  const prefix = serviceName.toUpperCase().replace(/-/g, '_') + '_';
  for (const key of Object.keys(process.env)) {
    if (key.startsWith(prefix)) {
      process.env[key.slice(prefix.length)] = process.env[key]!;
    }
  }
}

async function bootstrap() {
  // Dynamic imports are used so each module is evaluated AFTER useService() sets
  // the correct DATABASE_URL / REDIS_URL for that service.

  useService('auth-service');
  const { AppModule: AuthAppModule } = await import('../../auth-service/src/app.module');
  await createApp({ serviceName: 'Auth Service', defaultPort: 3001, module: AuthAppModule, excludePrefixes: ['.well-known/*path'] });

  useService('iam-service');
  const { AppModule: IamAppModule } = await import('../../iam-service/src/app.module');
  await createApp({ serviceName: 'IAM Service', defaultPort: 3002, module: IamAppModule });

  useService('config-service');
  const { ConfigAppModule } = await import('../../config-service/src/app.module');
  await createApp({ serviceName: 'Config Service', defaultPort: 3003, module: ConfigAppModule });

  useService('storage-service');
  const { StorageAppModule } = await import('../../storage-service/src/app.module');
  await createApp({ serviceName: 'Storage Service', defaultPort: 3004, module: StorageAppModule });

  useService('notification-service');
  const { NotificationAppModule } = await import('../../notification-service/src/app.module');
  await createApp({ serviceName: 'Notification Service', defaultPort: 3005, module: NotificationAppModule });

  useService('cms-service');
  const { AppModule: CmsAppModule } = await import('../../cms-service/src/app.module');
  await createApp({ serviceName: 'CMS Service', defaultPort: 3006, module: CmsAppModule });

  useService('post-service');
  const { AppModule: PostAppModule } = await import('../../post-service/src/app.module');
  await createApp({ serviceName: 'Post Service', defaultPort: 3008, module: PostAppModule });

  useService('comic-service');
  const { AppModule: ComicAppModule } = await import('../../comic-service/src/app.module');
  await createApp({ serviceName: 'Comic Service', defaultPort: 3009, module: ComicAppModule });

  useService('web-api-service');
  const { GatewayAppModule } = await import('../../web-api-service/src/app.module');
  await createApp({ serviceName: 'Web API Service', defaultPort: 3010, module: GatewayAppModule });

  console.log('Monolith: 9 services running in one process');
}

bootstrap().catch((err) => {
  console.error('Monolith failed to start', err);
  process.exit(1);
});
