import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';
import bffConfig from './config/bff.config';
import { JwtGuard } from './guards/jwt.guard';
import { BffHomepageModule } from './homepage/homepage.module';
import { BffHealthModule } from './health/health.module';
import { BffComicsModule } from './comics/comics.module';
import { BffPostsModule } from './posts/posts.module';
import { BffSearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [bffConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3006),
        NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
        COMIC_SERVICE_URL: Joi.string().uri().default('http://localhost:3001/api'),
        MAIN_SERVICE_URL: Joi.string().uri().default('http://localhost:8000/api'),
        BFF_REDIS_URL: Joi.string().optional().allow(''),
        SERVICE_TIMEOUT_MS: Joi.number().default(5000),
        AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),
      }).unknown(true),
    }),
    BffHomepageModule,
    BffHealthModule,
    BffComicsModule,
    BffPostsModule,
    BffSearchModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) => new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
  ],
})
export class BffAppModule {}
