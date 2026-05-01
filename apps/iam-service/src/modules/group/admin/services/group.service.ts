import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { GroupRepository } from '../../repositories/group.repository';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { UpdateGroupDto } from '../dtos/update-group.dto';
import { AddMemberDto } from '../dtos/add-member.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly repo: GroupRepository,
    private readonly i18n: I18nService,
  ) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);
    const where: any = {};
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;
    if (query.context_id) where.context_id = BigInt(query.context_id);
    const [data, total] = await Promise.all([
      this.repo.findMany(where, options.skip, options.take),
      this.repo.count(where),
    ]);
    return { data, meta: { page: options.page, limit: options.take, total, total_pages: Math.ceil(total / options.take) } };
  }

  async getOne(id: PrimaryKey) {
    const item = await this.repo.findById(id);
    if (!item) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new NotFoundException(this.i18n.t('group.NOT_FOUND', { lang }));
    }
    return item;
  }

  async create(dto: CreateGroupDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new ConflictException(this.i18n.t('group.CODE_EXISTS', { lang }));
    }
    const data: any = {
      type: dto.type,
      code: dto.code,
      name: dto.name,
      description: dto.description,
      context_id: BigInt(dto.context_id),
      created_user_id: actorId,
    };
    if (dto.owner_id) data.owner_id = BigInt(dto.owner_id);
    return this.repo.create(data);
  }

  async update(id: PrimaryKey, dto: UpdateGroupDto, actorId: PrimaryKey) {
    await this.getOne(id);
    const data: any = { updated_user_id: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.status !== undefined) data.status = dto.status;
    if ('owner_id' in dto) {
      data.owner_id = dto.owner_id ? BigInt(dto.owner_id) : null;
    }
    return this.repo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }

  async getMembers(id: PrimaryKey, query: any) {
    await this.getOne(id);
    const options = parseQueryOptions(query);
    const [data, total] = await Promise.all([
      this.repo.getMembers(id, options.skip, options.take),
      this.repo.countMembers(id),
    ]);
    return { data, meta: { page: options.page, limit: options.take, total, total_pages: Math.ceil(total / options.take) } };
  }

  async addMember(id: PrimaryKey, dto: AddMemberDto) {
    await this.getOne(id);
    await this.repo.addMember(id, BigInt(dto.userId));
    return { added: true };
  }

  async removeMember(id: PrimaryKey, userId: string) {
    await this.getOne(id);
    await this.repo.removeMember(id, BigInt(userId));
    return { removed: true };
  }
}
