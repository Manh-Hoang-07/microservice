import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GeneralConfigService } from '../../admin/services/general-config.service';
import { Public } from '../../../../../common/permission.decorator';

@ApiTags('System Config - General')
@ApiBearerAuth('access-token')
@Controller('config/general')
export class PublicGeneralConfigController {
  constructor(private readonly generalConfigService: GeneralConfigService) {}

  @Public()
  @Get()
  getConfig() {
    return this.generalConfigService.getConfig();
  }
}
