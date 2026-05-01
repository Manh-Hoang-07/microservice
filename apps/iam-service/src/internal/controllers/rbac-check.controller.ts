import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { RbacService } from '../../rbac/services/rbac.service';
import { RbacCheckDto } from '../dtos/rbac-check.dto';
import { Internal } from '@package/common';

@ApiTags('Internal')
@Internal()
@Controller('internal/rbac')
export class InternalRbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Post('check')
  @ApiOperation({ summary: 'Check user permissions (internal)' })
  @ApiBody({ type: RbacCheckDto })
  async checkPermissions(@Body() body: RbacCheckDto) {
    const { userId, groupId, permissions } = body;
    if (!permissions?.length) return { allowed: false };

    const allowed = await this.rbacService.hasPermissions(
      userId,
      groupId ?? null,
      permissions,
    );

    return { allowed };
  }
}
