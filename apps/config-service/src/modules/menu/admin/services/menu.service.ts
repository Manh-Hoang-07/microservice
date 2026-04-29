import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MenuRepository, MenuFilter } from '../../repositories/menu.repository';
import { MenuTreeItem } from '../../interfaces/menu-tree-item.interface';
import { buildMenuTree, filterPublicMenus } from '../../helpers/menu.helper';
import { toPrimaryKey } from '../../../../common/core/primary-key.util';
import { createPaginationMeta } from '../../../../common/core/pagination.helper';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepo: MenuRepository) {}

  async getList(query: any = {}) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const filter: MenuFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.type) filter.type = query.type;
    if (query.parent_id !== undefined) filter.parent_id = query.parent_id;
    if (query.parentId !== undefined) filter.parentId = query.parentId;
    if (query.group) filter.group = query.group;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.menuRepo.findMany(filter, { skip, take: limit }),
      skipCount ? Promise.resolve(0) : this.menuRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(page, limit, total) };
  }

  async getSimpleList(query: any = {}) {
    return this.getList({
      ...query,
      limit: query.limit ?? 50,
      sort: query.sort ?? 'sort_order:ASC',
      skipCount: true,
    });
  }

  async getOne(id: any) {
    const item = await this.menuRepo.findById(toPrimaryKey(id));
    if (!item) throw new NotFoundException('Menu not found');
    return item;
  }

  async create(dto: any) {
    const payload = this.preparePayload(dto);
    if (payload.code && (await this.menuRepo.findByCode(payload.code))) {
      throw new BadRequestException('Menu code already exists');
    }
    return this.menuRepo.create(payload as Prisma.MenuCreateInput);
  }

  async createWithUser(dto: any, userId?: any) {
    if (userId) dto.created_user_id = toPrimaryKey(userId);
    return this.create(dto);
  }

  async update(id: any, dto: any) {
    const current = await this.getOne(id);
    const payload = this.preparePayload(dto);
    if (payload.code && payload.code !== (current as any).code) {
      if (await this.menuRepo.findByCode(payload.code)) {
        throw new BadRequestException('Menu code already exists');
      }
    }
    return this.menuRepo.update(toPrimaryKey(id), payload as Prisma.MenuUpdateInput);
  }

  async updateById(id: any, dto: any, userId?: any) {
    if (userId) dto.updated_user_id = toPrimaryKey(userId);
    return this.update(id, dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.menuRepo.delete(toPrimaryKey(id));
    return true;
  }

  async getTree(): Promise<MenuTreeItem[]> {
    const menus = await this.menuRepo.findAllWithChildren({});
    return buildMenuTree(menus);
  }

  async getPublicMenuTree(userId?: any): Promise<MenuTreeItem[]> {
    const dbFilter: MenuFilter = { status: 'active', group: 'client' };
    const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
    const menus = allMenus.filter((m: any) => m.show_in_menu);
    const filtered = filterPublicMenus(menus, userId);
    return buildMenuTree(filtered);
  }

  private preparePayload(data: any): any {
    const payload = { ...data };
    const bigIntFields = ['parent_id', 'created_user_id', 'updated_user_id'];
    bigIntFields.forEach((field) => {
      if (payload[field] !== undefined && payload[field] !== null && payload[field] !== '') {
        payload[field] = toPrimaryKey(payload[field]);
      } else if (payload[field] === '' || payload[field] === null) {
        payload[field] = null;
      }
    });
    return payload;
  }
}
