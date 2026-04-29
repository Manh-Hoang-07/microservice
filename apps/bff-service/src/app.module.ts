import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import bffConfig from './config/bff.config';
import { envValidationSchema } from './config/env.validation';
import { JwtGuard, GlobalExceptionFilter, HealthModule } from '@package/common';
import { BffHomepageModule } from './homepage/homepage.module';
import { BffComicsModule } from './comics/comics.module';
import { BffPostsModule } from './posts/posts.module';
import { BffSearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [bffConfig],
      validationSchema: envValidationSchema,
    }),
    BffHomepageModule,
    HealthModule.register('bff-service'),
    BffComicsModule,
    BffPostsModule,
    BffSearchModule,
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
export class BffAppModule {}
