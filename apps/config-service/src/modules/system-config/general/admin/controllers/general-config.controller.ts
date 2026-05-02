import {
  Controller,
  Put,
  Body,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { GeneralConfigService } from '../services/general-config.service';
import { UpdateGeneralConfigDto } from '../dtos/update-general-config.dto';
import { Permission } from '@package/common';

@Controller('config/general')
export class AdminGeneralConfigController {
  constructor(private readonly generalConfigService: GeneralConfigService) {}

  @Permission('config.manage')
  @Put()
  updateConfig(
    @Body(ValidationPipe) dto: UpdateGeneralConfigDto,
    @Req() req: any,
  ) {
    const userId = req.user?.sub ?? req.user?.id;
    return this.generalConfigService.updateConfig(dto, userId);
  }
}
