import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CrudService, t, getSessionUserId } from '@package/common';
import { PrimaryKey } from 'src/types';
import { GroupRepository } from '../../repositories/group.repository';
import { GroupMemberRoleRepository } from '../../repositories/group-member-role.repository';
import { GroupMembersService } from '../../services/group-members.service';
import { GROUP_OWNER_ROLE } from '../../constants/group-role.constant';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { UpdateGroupDto } from '../dtos/update-group.dto';
import { AddMemberDto } from '../dtos/add-member.dto';

@Injectable()
export class GroupService extends CrudService<GroupRepository> {
  constructor(
    groupRepo: GroupRepository,
    private readonly memberRoleRepo: GroupMemberRoleRepository,
    private readonly membersService: GroupMembersService,
    private readonly i18n: I18nService,
  ) {
    super(groupRepo);
  }

  private async setupOwner(groupId: PrimaryKey, ownerId: string | bigint, tx: any) {
    await this.repository.addMember(groupId, ownerId, tx);
    await this.memberRoleRepo.assignByRoleCode(ownerId, groupId, GROUP_OWNER_ROLE, tx);
  }

  async getOne(id: any) {
    const item = await this.repository.findById(id);
    if (!item) throw new NotFoundException(t(this.i18n, 'group.NOT_FOUND'));
    return item;
  }

  async create(dto: CreateGroupDto) {
    const existing = await this.repository.findByCode(dto.code);
    if (existing) throw new ConflictException(t(this.i18n, 'group.CODE_EXISTS'));
    const actorId = getSessionUserId();
    const data: any = {
      type: dto.type,
      code: dto.code,
      name: dto.name,
      description: dto.description,
      createdUserId: actorId,
    };
    if (dto.ownerId) data.ownerId = dto.ownerId;

    return this.repository.withTransaction(async (tx) => {
      const group = await this.repository.create(data, tx);
      if (dto.ownerId) {
        await this.setupOwner(group.id, dto.ownerId, tx);
      }
      return group;
    });
  }

  async update(id: PrimaryKey, dto: UpdateGroupDto) {
    await this.getOne(id);
    const actorId = getSessionUserId();
    const data: any = { updatedUserId: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.status !== undefined) data.status = dto.status;
    if ('ownerId' in dto) data.ownerId = dto.ownerId ? dto.ownerId : null;

    return this.repository.withTransaction(async (tx) => {
      const group = await this.repository.update(id, data, tx);
      if (dto.ownerId) {
        await this.setupOwner(id, dto.ownerId, tx);
      }
      return group;
    });
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.repository.delete(id);
    return { message: t(this.i18n, 'group.DELETED') };
  }

  async getMembers(id: PrimaryKey, query: any) {
    await this.getOne(id);
    return this.membersService.listMembers(id as any, query);
  }

  async addMember(id: PrimaryKey, dto: AddMemberDto) {
    await this.getOne(id);
    await this.repository.addMember(id, dto.userId);
    return { message: t(this.i18n, 'group.MEMBER_ADDED') };
  }

  async removeMember(id: PrimaryKey, userId: PrimaryKey) {
    await this.getOne(id);
    await this.repository.removeMember(id, userId);
    return { message: t(this.i18n, 'group.MEMBER_REMOVED') };
  }
}
