import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { Internal, InternalGuard } from '@package/common';
import { GroupRepository } from '../../modules/group/repositories/group.repository';
import { GroupMembershipQueryDto } from '../dtos/group-membership-query.dto';

@Internal()
@UseGuards(InternalGuard)
@Controller('internal/groups')
export class InternalGroupController {
  constructor(private readonly groupRepo: GroupRepository) {}

  @Get('membership')
  async getMembership(@Query(ValidationPipe) query: GroupMembershipQueryDto) {
    const userGroups = await this.groupRepo.findUserGroups(query.userId);
    const match = userGroups.find((ug) => String(ug.groupId) === query.groupId);

    if (!match) return { isMember: false, isOwner: false };

    const isOwner =
      match.group.ownerId !== null && String(match.group.ownerId) === query.userId;
    return { isMember: true, isOwner };
  }
}
