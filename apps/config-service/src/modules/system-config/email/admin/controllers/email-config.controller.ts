import {
  Controller,
  Put,
  Body,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmailConfigService } from '../services/email-config.service';
import { UpdateEmailConfigDto } from '../dtos/update-email-config.dto';
import { Permission } from '@package/common';

@ApiTags('System Config - Email')
@ApiBearerAuth('access-token')
@Controller('config/email')
export class AdminEmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  /**
   * PUT /api/config/email — admin (JWT required)
   */
  @Permission('config.manage')
  @Put()
  updateConfig(
    @Body(ValidationPipe) dto: UpdateEmailConfigDto,
    @Req() req: any,
  ) {
    const userId = req.user?.sub ?? req.user?.id;
    return this.emailConfigService.updateConfig(dto, userId);
  }
}
