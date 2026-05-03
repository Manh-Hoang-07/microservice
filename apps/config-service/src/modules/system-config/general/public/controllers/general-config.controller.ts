import { Controller, Get } from '@nestjs/common';
import { GeneralConfigService } from '../../admin/services/general-config.service';
import { Public } from '@package/common';

@Controller('config/general')
export class PublicGeneralConfigController {
  constructor(private readonly generalConfigService: GeneralConfigService) {}

  @Public()
  @Get()
  getConfig() {
    return this.generalConfigService.getConfig();
  }
}
