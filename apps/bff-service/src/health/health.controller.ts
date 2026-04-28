import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';
import { BffCacheService } from '../cache/bff-cache.service';

const Public = () => SetMetadata('perms_required', ['public']);

@ApiTags('Health')
@Controller('health')
export class BffHealthController {
  constructor(private readonly cache: BffCacheService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'BFF Service liveness probe' })
  check() {
    return {
      status: 'ok',
      service: 'bff-service',
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.floor(process.uptime()),
      cache_enabled: this.cache.isEnabled,
    };
  }
}
