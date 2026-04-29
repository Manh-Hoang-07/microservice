import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StorageAppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    StorageAppModule,
    { bufferLogs: true },
  );

  const port = parseInt(process.env.PORT ?? '3003', 10);
  const prefix = process.env.GLOBAL_PREFIX ?? 'api';

  app.setGlobalPrefix(prefix);
  app.enableCors({ origin: process.env.CORS_ORIGINS?.split(',') ?? '*' });
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const doc = new DocumentBuilder()
      .setTitle('Storage Service')
      .setDescription('File upload service — Comic Platform')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
      .build();
    SwaggerModule.setup(`${prefix}/docs`, app, SwaggerModule.createDocument(app, doc));
  }

  await app.listen(port);
  console.log(`🗂  Storage Service running on http://localhost:${port}/${prefix}`);
}

bootstrap().catch((err) => {
  console.error('Storage Service failed to start', err);
  process.exit(1);
});
