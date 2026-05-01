import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import gatewayConfig from './config/gateway.config';
import { envValidationSchema } from './config/env.validation';
import { JwtGuard, GlobalExceptionFilter, HealthModule } from '@package/common';
import { ClientsModule } from './clients/clients.module';
import { CacheModule } from './cache/cache.module';
import { GatewayHomepageModule } from './homepage/homepage.module';
import { GatewayComicsModule } from './comics/comics.module';
import { GatewayPostsModule } from './posts/posts.module';
import { GatewaySearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [gatewayConfig],
      validationSchema: envValidationSchema,
    }),
    ClientsModule,
    CacheModule,
    HealthModule.register('gateway-service'),
    GatewayHomepageModule,
    GatewayComicsModule,
    GatewayPostsModule,
    GatewaySearchModule,
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
export class GatewayAppModule {}
