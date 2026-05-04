import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RbacService } from '../../rbac/services/rbac.service';
import { RbacCheckDto } from '../dtos/rbac-check.dto';
import { Internal } from '@package/common';
import { toPrimaryKey } from 'src/types';

@Internal()
@Controller('internal/rbac')
export class InternalRbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Post('check')
  async checkPermissions(@Body() body: RbacCheckDto) {
    const { userId, groupId, permissions } = body;
    if (!permissions?.length) return { allowed: false };

    let parsedUser: bigint;
    let parsedGroup: bigint | null;
    try {
      parsedUser = toPrimaryKey(userId);
      parsedGroup = groupId ? toPrimaryKey(groupId) : null;
    } catch {
      throw new BadRequestException('Invalid id');
    }

    const allowed = await this.rbacService.hasPermissions(
      parsedUser,
      parsedGroup,
      permissions,
    );
    return { allowed };
  }
}
