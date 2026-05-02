import { Controller, Get, Inject } from '@nestjs/common';

const PERMS_KEY = 'perms_required';
import { SetMetadata } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(
    @Inject('HEALTH_SERVICE_NAME') private readonly serviceName: string,
  ) {}

  @Get()
  @SetMetadata(PERMS_KEY, ['public'])
  check() {
    return {
      status: 'ok',
      service: this.serviceName,
      timestamp: new Date().toISOString(),
    };
  }
}
