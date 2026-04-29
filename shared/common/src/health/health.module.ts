import { Module, DynamicModule } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({})
export class HealthModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: HealthModule,
      controllers: [HealthController],
      providers: [{ provide: 'HEALTH_SERVICE_NAME', useValue: serviceName }],
    };
  }
}
