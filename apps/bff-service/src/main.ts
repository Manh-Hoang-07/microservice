// Initialize OpenTelemetry tracing (must be first)
import { initTracing } from '@package/tracing';
initTracing('bff-service');

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BffAppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(BffAppModule, {
    bufferLogs: true,
  });

  const port = parseInt(process.env.PORT ?? '3006', 10);
  const prefix = process.env.GLOBAL_PREFIX ?? 'api';

  app.setGlobalPrefix(prefix);
  app.enableCors({ origin: process.env.CORS_ORIGINS?.split(',') ?? '*' });
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  if (process.env.NODE_ENV !== 'production') {
    const doc = new DocumentBuilder()
      .setTitle('BFF Service')
      .setDescription('Backend-for-Frontend — Homepage aggregation')
      .setVersion('1.0')
      .build();
    SwaggerModule.setup(
      `${prefix}/docs`,
      app,
      SwaggerModule.createDocument(app, doc),
    );
  }

  await app.listen(port);
  console.log(`🌐 BFF Service running on http://localhost:${port}/${prefix}`);
}

bootstrap().catch((err) => {
  console.error('BFF Service failed to start', err);
  process.exit(1);
});
