import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { createAppConfig } from '@package/config';
import { envValidationSchema } from './config/env.validation';
import { JwtGuard, GlobalExceptionFilter, HealthModule } from '@package/common';
import { DatabaseModule } from './database/database.module';
import { SystemConfigModule } from './modules/system-config/system-config.module';
import { MenuModule } from './modules/menu/menu.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [createAppConfig(3005, { internalApiSecret: process.env.INTERNAL_API_SECRET || '' })],
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    HealthModule.register('config-service'),
    SystemConfigModule,
    MenuModule,
    LocationModule,
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
  ],
})
export class ConfigAppModule {}
