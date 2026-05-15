import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Permission } from '@package/common';
import { GroupOwnerGuard } from '../guards/group-owner.guard';
import { OwnerGroupService } from '../services/owner-group.service';
import { AddMemberDto } from '../../admin/dtos/add-member.dto';
import { AssignRoleDto } from '../dtos/assign-role.dto';
import { ListOwnerGroupsQueryDto, ListOwnerMembersQueryDto } from '../dtos/list-owner.query.dto';

@Controller('owner/groups')
export class OwnerGroupController {
  constructor(private readonly service: OwnerGroupService) {}

  @Permission('user')
  @Get()
  getMyGroups(@Query() query: ListOwnerGroupsQueryDto) {
    return this.service.getList(query);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Get(':id')
  getGroupDetail(@Req() req: any) {
    return this.service.getGroupDetail(req.group);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Get(':id/members')
  getMembers(@Req() req: any, @Query() query: ListOwnerMembersQueryDto) {
    return this.service.getMembers(req.group.id, query);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Post(':id/members')
  addMember(@Req() req: any, @Body() dto: AddMemberDto) {
    return this.service.addMember(req.group.id, dto.userId);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Delete(':id/members/:userId')
  removeMember(@Req() req: any, @Param('userId') userId: string) {
    return this.service.removeMember(req.group.id, userId);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Get(':id/roles')
  getAvailableRoles(@Req() req: any) {
    return this.service.getAvailableRoles(req.group);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Get(':id/members/:userId/roles')
  getMemberRoles(@Req() req: any, @Param('userId') userId: string) {
    return this.service.getMemberRoles(req.group.id, userId);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Post(':id/members/:userId/roles')
  assignRole(
    @Req() req: any,
    @Param('userId') userId: string,
    @Body() dto: AssignRoleDto,
  ) {
    return this.service.assignRole(req.group, userId, dto.roleId);
  }

  @Permission('user')
  @UseGuards(GroupOwnerGuard)
  @Delete(':id/members/:userId/roles/:roleId')
  revokeRole(
    @Req() req: any,
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.service.revokeRole(req.group, userId, roleId);
  }
}
