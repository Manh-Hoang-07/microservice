import { BadRequestException, Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { RbacService } from '../../rbac/services/rbac.service';
import { RbacCheckDto } from '../dtos/rbac-check.dto';
import { RbacPermissionsQueryDto } from '../dtos/rbac-permissions-query.dto';
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

  @Get('permissions')
  async getPermissions(@Query(ValidationPipe) query: RbacPermissionsQueryDto) {
    let parsedUser: bigint;
    let parsedGroup: bigint | null;
    try {
      parsedUser = toPrimaryKey(query.userId);
      parsedGroup = query.groupId ? toPrimaryKey(query.groupId) : null;
    } catch {
      throw new BadRequestException('Invalid id');
    }

    const permSet = await this.rbacService.getPermissions(parsedUser, parsedGroup);
    return { permissions: Array.from(permSet) };
  }
}
