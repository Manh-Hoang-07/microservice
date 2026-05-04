import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@package/common';
import { randomUUID } from 'crypto';
import helmet from 'helmet';
import { JsonLogger } from './json-logger';

// Permitted set of inbound `x-request-id` header values. Anything outside
// this character class is replaced with a fresh uuid to defeat header
// injection / log-poisoning via control characters.
const SAFE_REQUEST_ID_RE = /^[A-Za-z0-9._-]{1,128}$/;

export interface BootstrapOptions {
  serviceName: string;
  defaultPort: number;
  module: any;
  /** Paths to exclude from global prefix (e.g. ['.well-known/(.*)'] for auth-service JWKS) */
  excludePrefixes?: string[];
}

export async function createApp(options: BootstrapOptions): Promise<NestExpressApplication> {
  // Force the Node process TZ to UTC so `Date` objects serialize identically
  // regardless of the host's locale. `APP_TIMEZONE` is still honored — but
  // it's now an APPLICATION-level concern (date formatting in I/O), not a
  // node-runtime one. Setting `TZ=Asia/Ho_Chi_Minh` previously caused
  // pg-adapter to write "local-wall-clock" strings into `timestamp without
  // time zone` columns, then read them back as if UTC, producing a silent
  // ±7-hour drift on every login/audit/notification timestamp.
  process.env.TZ = 'UTC';

  const serviceName = process.env.SERVICE_NAME ?? options.serviceName;

  const app = await NestFactory.create<NestExpressApplication>(options.module, {
    bufferLogs: true,
    logger: new JsonLogger(serviceName),
  });

  const port = parseInt(process.env.PORT ?? String(options.defaultPort), 10);
  // API versioning baked into the prefix: `/api/v1/<route>`. Changing the
  // prefix env var is the supported way to bump major versions when a
  // breaking change ships.
  const prefix = process.env.GLOBAL_PREFIX ?? 'api/v1';
  const isProd = process.env.NODE_ENV === 'production';

  if (options.excludePrefixes?.length) {
    app.setGlobalPrefix(prefix, { exclude: options.excludePrefixes });
  } else {
    app.setGlobalPrefix(prefix);
  }

  // Request-ID middleware: trust an upstream `x-request-id` if it looks
  // sane, otherwise mint a fresh uuid. Echoed on the response so log
  // shippers can correlate client → gateway → service traces even when
  // OpenTelemetry isn't enabled.
  app.use((req: any, res: any, next: () => void) => {
    const incoming = req.headers?.['x-request-id'];
    const candidate = typeof incoming === 'string' && SAFE_REQUEST_ID_RE.test(incoming)
      ? incoming
      : randomUUID();
    req.requestId = candidate;
    res.setHeader('x-request-id', candidate);
    next();
  });

  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

  const corsEnabled = process.env.CORS_ENABLED !== 'false';
  if (corsEnabled) {
    const raw = process.env.CORS_ORIGINS?.trim();
    if (isProd && (!raw || raw === '*')) {
      throw new Error(
        'CORS_ORIGINS must be a non-empty, explicit list in production (wildcard "*" is not allowed).',
      );
    }
    const corsOrigins = raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : '*';
    app.enableCors({
      origin: corsOrigins,
      credentials: true,
      methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
  }
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
  // Use Nest's Logger so the structured-log shipper (pino/winston) and OTel
  // logs bridge can consume the startup line. Previously a raw console.log
  // bypassed both.
  new Logger('Bootstrap').log(
    `${serviceName} running on http://localhost:${port}/${prefix}`,
  );

  return app;
}
