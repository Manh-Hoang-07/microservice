import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

export interface BootstrapOptions {
  serviceName: string;
  defaultPort: number;
  module: any;
  /** Paths to exclude from global prefix (e.g. ['.well-known/(.*)'] for auth-service JWKS) */
  excludePrefixes?: string[];
}

export async function createApp(options: BootstrapOptions): Promise<NestExpressApplication> {
  if (process.env.APP_TIMEZONE) {
    process.env.TZ = process.env.APP_TIMEZONE;
  }

  const app = await NestFactory.create<NestExpressApplication>(options.module, {
    bufferLogs: true,
  });

  const serviceName = process.env.SERVICE_NAME ?? options.serviceName;
  const port = parseInt(process.env.PORT ?? String(options.defaultPort), 10);
  const prefix = process.env.GLOBAL_PREFIX ?? 'api';

  if (options.excludePrefixes?.length) {
    app.setGlobalPrefix(prefix, { exclude: options.excludePrefixes });
  } else {
    app.setGlobalPrefix(prefix);
  }

  const corsEnabled = process.env.CORS_ENABLED !== 'false';
  if (corsEnabled) {
    const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()) ?? '*';
    app.enableCors({ origin: corsOrigins });
  }
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.listen(port);
  console.log(`${serviceName} running on http://localhost:${port}/${prefix}`);

  return app;
}
