// Initialize OpenTelemetry tracing (must be first)
import { initTracing } from '../../shared/tracing/src';
initTracing('auth-service');

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const port = parseInt(process.env.PORT ?? '3002', 10);
  const prefix = process.env.GLOBAL_PREFIX ?? 'api';

  // Apply global prefix, but exclude .well-known (JWKS endpoint)
  app.setGlobalPrefix(prefix, {
    exclude: ['.well-known/(.*)'],
  });

  const corsOrigins = process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()) ?? '*';
  app.enableCors({ origin: corsOrigins });
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const doc = new DocumentBuilder()
      .setTitle('Auth Service')
      .setDescription('Authentication, Authorization and JWKS — Comic Platform')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();
    SwaggerModule.setup(
      `${prefix}/docs`,
      app,
      SwaggerModule.createDocument(app, doc),
    );
  }

  await app.listen(port);
  console.log(`Auth Service running on http://localhost:${port}/${prefix}`);
  console.log(`JWKS endpoint: http://localhost:${port}/.well-known/jwks.json`);
}

bootstrap().catch((err) => {
  console.error('Auth Service failed to start', err);
  process.exit(1);
});
