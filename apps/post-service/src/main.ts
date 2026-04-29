// Initialize OpenTelemetry tracing (must be first)
import { initTracing } from '@package/tracing';
initTracing('post-service');

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

  const port = parseInt(process.env.PORT ?? '3007', 10);
  const prefix = process.env.GLOBAL_PREFIX ?? 'api';

  app.setGlobalPrefix(prefix);

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
      .setTitle('Post Service')
      .setDescription('Post domain microservice — Blog Platform')
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
  console.log(`Post Service running on http://localhost:${port}/${prefix}`);
}

bootstrap().catch((err) => {
  console.error('Post Service failed to start', err);
  process.exit(1);
});
