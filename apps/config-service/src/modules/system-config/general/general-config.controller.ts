import {
  Controller,
  Get,
  Put,
  Body,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GeneralConfigService } from './general-config.service';
import { UpdateGeneralConfigDto } from './dtos/update-general-config.dto';
import { Permission, Public } from '../../../common/permission.decorator';

@ApiTags('System Config - General')
@ApiBearerAuth('access-token')
@Controller('config/general')
export class GeneralConfigController {
  constructor(private readonly generalConfigService: GeneralConfigService) {}

  @Public()
  @Get()
  getConfig() {
    return this.generalConfigService.getConfig();
  }

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
