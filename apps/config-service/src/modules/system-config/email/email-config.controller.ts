import {
  Controller,
  Get,
  Put,
  Body,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EmailConfigService } from './email-config.service';
import { UpdateEmailConfigDto } from './dtos/update-email-config.dto';
import { Permission, Internal } from '../../../common/permission.decorator';
import { InternalGuard } from '../../../guards/internal.guard';

@ApiTags('System Config - Email')
@ApiBearerAuth('access-token')
@Controller('config/email')
export class EmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  /**
   * GET /api/config/email — internal only (x-internal-secret header required)
   */
  @Internal()
  @UseGuards(InternalGuard)
  @Get()
  getConfig() {
    return this.emailConfigService.getConfig();
  }

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
