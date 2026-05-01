import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { parseQueryOptions } from '@package/common';
import { PrimaryKey } from 'src/types';
import { ContextRepository } from '../../repositories/context.repository';
import { CreateContextDto } from '../dtos/create-context.dto';
import { UpdateContextDto } from '../dtos/update-context.dto';
import { SyncRolesDto } from '../dtos/sync-roles.dto';

@Injectable()
export class ContextService {
  constructor(
    private readonly repo: ContextRepository,
    private readonly i18n: I18nService,
  ) {}

  async getList(query: any) {
    const options = parseQueryOptions(query);
    const where: any = {};
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;
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
      throw new NotFoundException(this.i18n.t('context.NOT_FOUND', { lang }));
    }
    return item;
  }

  async create(dto: CreateContextDto, actorId: PrimaryKey) {
    const existing = await this.repo.findByCode(dto.code);
    if (existing) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new ConflictException(this.i18n.t('context.CODE_EXISTS', { lang }));
    }
    const data: any = {
      type: dto.type,
      code: dto.code,
      name: dto.name,
      created_user_id: actorId,
    };
    if (dto.ref_id) data.ref_id = BigInt(dto.ref_id);
    return this.repo.create(data);
  }

  async update(id: PrimaryKey, dto: UpdateContextDto, actorId: PrimaryKey) {
    await this.getOne(id);
    const data: any = { updated_user_id: actorId };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.status !== undefined) data.status = dto.status;
    return this.repo.update(id, data);
  }

  async delete(id: PrimaryKey) {
    await this.getOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }

  async syncRoles(id: PrimaryKey, dto: SyncRolesDto) {
    await this.getOne(id);
    await this.repo.syncRoles(id, dto.roleIds.map(BigInt));
    return { updated: true };
  }
}
