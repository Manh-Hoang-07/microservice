import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PUBLIC } from '@auth-client/jwt-local.guard';
import { SetMetadata } from '@nestjs/common';

const PERMS_KEY = 'perms_required';
const Public = () => SetMetadata(PERMS_KEY, [PUBLIC]);

@ApiTags('Health')
@Controller('health')
export class StorageHealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Storage Service liveness probe' })
  check() {
    return {
      status: 'ok',
      service: 'storage-service',
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.floor(process.uptime()),
    };
  }
}
