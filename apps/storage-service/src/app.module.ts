import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import storageConfig from './config/storage.config';
import { JwtGuard, GlobalExceptionFilter, HealthModule } from '@package/common';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [storageConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3003),
        NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
        STORAGE_TYPE: Joi.string().valid('local', 's3', 'cloudinary').default('local'),
        STORAGE_MAX_FILE_SIZE: Joi.number().default(10485760),
        AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),
      }).unknown(true),
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    UploadModule,
    HealthModule.register('storage-service'),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) => new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
  ],
})
export class StorageAppModule {}
