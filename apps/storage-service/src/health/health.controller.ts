import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../common/permission.decorator';

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
