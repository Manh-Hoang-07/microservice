import { Module } from '@nestjs/common';
import { MetricsModule } from '@package/bootstrap';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import webApiConfig from './core/config/web-api.config';
import { envValidationSchema } from './core/config/env.validation';
import { CoreModule } from './core/core.module';
import { JwtGuard, GlobalExceptionFilter, HealthModule, BigIntSerializationInterceptor } from '@package/common';
import { ClientsModule } from './clients/clients.module';
import { CacheModule } from './cache/cache.module';
import { GatewayHomepageModule } from './homepage/homepage.module';
import { GatewaySearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.production', '.env'],
      load: [webApiConfig],
      validationSchema: envValidationSchema,
    }),
    CoreModule,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntSerializationInterceptor,
    },
  ],
})
export class GatewayAppModule {}
