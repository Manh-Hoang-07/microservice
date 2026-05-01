import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { MenuRepository, MenuFilter } from '../../repositories/menu.repository';
import { MenuTreeItem } from '../../interfaces/menu-tree-item.interface';
import { buildMenuTree, filterPublicMenus } from '../../helpers/menu.helper';
import { createPaginationMeta, parseQueryOptions } from '@package/common';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepo: MenuRepository,
    private readonly i18n: I18nService,
  ) {}

  private t(key: string): string {
    const lang = I18nContext.current()?.lang ?? 'en';
    return this.i18n.t(key, { lang }) as string;
  }

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: MenuFilter = {};
    if (query.search) filter.search = query.search;
    if (query.status) filter.status = query.status;
    if (query.type) filter.type = query.type;
    if (query.parent_id !== undefined) filter.parent_id = query.parent_id;
    if (query.parentId !== undefined) filter.parentId = query.parentId;
    if (query.group) filter.group = query.group;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.menuRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.menuRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
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
    const item = await this.menuRepo.findById(id);
    if (!item) throw new NotFoundException(this.t('menu.NOT_FOUND'));
    return item;
  }

  async create(dto: any) {
    if (dto.code && (await this.menuRepo.findByCode(dto.code))) {
      throw new BadRequestException(this.t('menu.CODE_EXISTS'));
    }
    return this.menuRepo.create(dto);
  }

  async createWithUser(dto: any, userId?: any) {
    if (userId) dto.created_user_id = userId;
    return this.create(dto);
  }

  async update(id: any, dto: any) {
    const current = await this.getOne(id);
    if (dto.code && dto.code !== (current as any).code) {
      if (await this.menuRepo.findByCode(dto.code)) {
        throw new BadRequestException(this.t('menu.CODE_EXISTS'));
      }
    }
    return this.menuRepo.update(id, dto);
  }

  async updateById(id: any, dto: any, userId?: any) {
    if (userId) dto.updated_user_id = userId;
    return this.update(id, dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.menuRepo.delete(id);
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
}
