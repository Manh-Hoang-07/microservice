import { Module } from '@nestjs/common';
import { MetricsModule } from '@package/bootstrap';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import webApiConfig from './config/web-api.config';
import { envValidationSchema } from './config/env.validation';
import { JwtGuard, GlobalExceptionFilter, HealthModule } from '@package/common';
import { ClientsModule } from './clients/clients.module';
import { CacheModule } from './cache/cache.module';
import { GatewayHomepageModule } from './homepage/homepage.module';
import { GatewaySearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [webApiConfig],
      validationSchema: envValidationSchema,
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    ClientsModule,
    CacheModule,
    HealthModule.register('web-api-service'),
    MetricsModule,
    GatewayHomepageModule,
    GatewaySearchModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) => new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
  ],
})
export class GatewayAppModule {}
