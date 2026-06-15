import './register'; // Must be first — patches Module._resolveFilename for src/* paths
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createApp } from '@package/bootstrap';

const APPS_DIR = path.resolve(__dirname, '../..');
const MONOLITH_ENV = path.resolve(__dirname, '../.env');

// Load service-specific env vars THEN set monolith overrides on top.
// Called immediately before each dynamic import so that ConfigModule.forRoot()
// (which validates env at decorator evaluation time) sees the correct values.
// NODE_ENV set externally (cross-env, Docker, system) always wins over .env files.
// Load order: .env → .env.{NODE_ENV} → .env.local → monolith overrides
function applyEnvFile(filePath: string): void {
  try {
    const parsed = dotenv.parse(fs.readFileSync(filePath, 'utf8'));
    Object.assign(process.env, parsed);
  } catch (_) {
    // file not found — skip silently
  }
}

function loadEnv(serviceName: string) {
  const externalNodeEnv = process.env.NODE_ENV;
  const serviceDir = path.join(APPS_DIR, serviceName);
  applyEnvFile(path.join(serviceDir, '.env'));
  if (externalNodeEnv) applyEnvFile(path.join(serviceDir, `.env.${externalNodeEnv}`));
  applyEnvFile(path.join(serviceDir, '.env.local'));
  applyEnvFile(MONOLITH_ENV);
  if (externalNodeEnv) process.env.NODE_ENV = externalNodeEnv;
}

async function bootstrap() {
  // Dynamic imports are used so each module is evaluated AFTER loadEnv() sets
  // the correct DATABASE_URL / REDIS_URL for that service.

  loadEnv('auth-service');
  const { AppModule: AuthAppModule } = await import('../../auth-service/src/app.module');
  await createApp({ serviceName: 'Auth Service', defaultPort: 3001, module: AuthAppModule, excludePrefixes: ['.well-known/*path'] });

  loadEnv('iam-service');
  const { AppModule: IamAppModule } = await import('../../iam-service/src/app.module');
  await createApp({ serviceName: 'IAM Service', defaultPort: 3002, module: IamAppModule });

  loadEnv('config-service');
  const { ConfigAppModule } = await import('../../config-service/src/app.module');
  await createApp({ serviceName: 'Config Service', defaultPort: 3003, module: ConfigAppModule });

  loadEnv('storage-service');
  const { StorageAppModule } = await import('../../storage-service/src/app.module');
  await createApp({ serviceName: 'Storage Service', defaultPort: 3004, module: StorageAppModule });

  loadEnv('notification-service');
  const { NotificationAppModule } = await import('../../notification-service/src/app.module');
  await createApp({ serviceName: 'Notification Service', defaultPort: 3005, module: NotificationAppModule });

  loadEnv('cms-service');
  const { AppModule: CmsAppModule } = await import('../../cms-service/src/app.module');
  await createApp({ serviceName: 'CMS Service', defaultPort: 3006, module: CmsAppModule });

  loadEnv('post-service');
  const { AppModule: PostAppModule } = await import('../../post-service/src/app.module');
  await createApp({ serviceName: 'Post Service', defaultPort: 3008, module: PostAppModule });

  loadEnv('comic-service');
  const { AppModule: ComicAppModule } = await import('../../comic-service/src/app.module');
  await createApp({ serviceName: 'Comic Service', defaultPort: 3009, module: ComicAppModule });

  loadEnv('web-api-service');
  const { GatewayAppModule } = await import('../../web-api-service/src/app.module');
  await createApp({ serviceName: 'Web API Service', defaultPort: 3010, module: GatewayAppModule });

  console.log('Monolith: 9 services running in one process');
}

bootstrap().catch((err) => {
  console.error('Monolith failed to start', err);
  process.exit(1);
});
