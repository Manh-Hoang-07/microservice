import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { createAppConfig } from '@package/config';

import { DatabaseModule } from './database/database.module';
import { JwtGuard, BigIntSerializationInterceptor, GlobalExceptionFilter, HealthModule } from '@package/common';

import { AboutModule } from './modules/about/about.module';
import { StaffModule } from './modules/staff/staff.module';
import { ProjectModule } from './modules/project/project.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { PartnerModule } from './modules/partner/partner.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { FaqModule } from './modules/faq/faq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [createAppConfig(3008)],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3008),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        AUTH_JWKS_URL: Joi.string().optional().allow(''),
      }).unknown(true),
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    DatabaseModule,
    HealthModule.register('introduction-service'),
    AboutModule,
    StaffModule,
    ProjectModule,
    TestimonialModule,
    PartnerModule,
    GalleryModule,
    CertificateModule,
    FaqModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) =>
        new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntSerializationInterceptor,
    },
  ],
})
export class AppModule {}
