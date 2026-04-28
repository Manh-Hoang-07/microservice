import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';

// Reuse FileUploadModule từ monolith (stateless — không cần DB)
import { FileUploadModule } from '@/modules/storage/file-upload/file-upload.module';
import { JwtLocalGuard } from '@auth-client/jwt-local.guard';
import { StorageHealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '../../.env.docker'],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3003),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        STORAGE_TYPE: Joi.string()
          .valid('local', 's3', 'cloudinary')
          .default('local'),
        STORAGE_MAX_FILE_SIZE: Joi.number().default(10485760),
        AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),
        GLOBAL_PREFIX: Joi.string().default('api'),
      }).unknown(true),
    }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    FileUploadModule,
    StorageHealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) =>
        new JwtLocalGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
  ],
})
export class StorageAppModule {}
