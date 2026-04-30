import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { GroupRepository } from '../../repositories/group.repository';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { UpdateGroupDto } from '../dtos/update-group.dto';
import { AddMemberDto } from '../dtos/add-member.dto';

@Injectable()
export class GroupService {
  constructor(private readonly repo: GroupRepository) {}

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
    if (!item) throw new NotFoundException('Group not found');
    return item;
  }

  async create(dto: CreateGroupDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) throw new ConflictException('Group code already exists');
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
