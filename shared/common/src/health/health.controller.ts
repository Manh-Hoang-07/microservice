import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

const PERMS_KEY = 'perms_required';
import { SetMetadata } from '@nestjs/common';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    @Inject('HEALTH_SERVICE_NAME') private readonly serviceName: string,
  ) {}

  @Get()
  @SetMetadata(PERMS_KEY, ['public'])
  @ApiOperation({ summary: 'Health check' })
  check() {
    return {
      status: 'ok',
      service: this.serviceName,
      timestamp: new Date().toISOString(),
    };
  }
}
