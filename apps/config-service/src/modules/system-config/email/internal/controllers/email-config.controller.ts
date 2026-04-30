import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailConfigService } from '../../admin/services/email-config.service';
import { Internal, InternalGuard } from '@package/common';

@ApiTags('System Config - Email')
@Controller('config/email')
export class InternalEmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  @Internal()
  @UseGuards(InternalGuard)
  @Get()
  getConfig() {
    return this.emailConfigService.getRawConfig();
  }
}
