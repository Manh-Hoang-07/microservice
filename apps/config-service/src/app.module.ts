import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import * as Joi from 'joi';
import appConfig from './config/app.config';
import { JwtGuard } from './guards/jwt.guard';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { SystemConfigModule } from './modules/system-config/system-config.module';
import { MenuModule } from './modules/menu/menu.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [appConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3005),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DATABASE_URL: Joi.string().required(),
        AUTH_JWKS_URL: Joi.string().uri().optional().allow(''),
        INTERNAL_API_SECRET: Joi.string().optional().allow(''),
      }).unknown(true),
    }),
    DatabaseModule,
    HealthModule,
    SystemConfigModule,
    MenuModule,
    LocationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector, config: ConfigService) =>
        new JwtGuard(reflector, config),
      inject: [Reflector, ConfigService],
    },
  ],
})
export class ConfigAppModule {}
