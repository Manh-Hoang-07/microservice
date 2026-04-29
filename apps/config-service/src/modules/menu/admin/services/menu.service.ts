import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { IMenuRepository, MENU_REPOSITORY, MenuFilter } from '../../repositories/menu.repository';
import { BaseService } from '../../../../common/core/base.service';
import { Menu } from '@prisma/client';
import { MenuTreeItem } from '../../interfaces/menu-tree-item.interface';
import { buildMenuTree, filterPublicMenus } from '../../helpers/menu.helper';
import { toPrimaryKey } from '../../../../common/core/primary-key.util';

@Injectable()
export class MenuService extends BaseService<Menu, IMenuRepository> {
  constructor(
    @Inject(MENU_REPOSITORY)
    private readonly menuRepo: IMenuRepository,
  ) {
    super(menuRepo);
  }

  async getSimpleList(query: any) {
    return this.getList({
      ...query,
      limit: query.limit ?? 50,
      sort: query.sort ?? 'sort_order:ASC',
    });
  }

  async createWithUser(data: any, userId?: any) {
    if (userId) data.created_user_id = toPrimaryKey(userId);
    return this.create(data);
  }

  async updateById(id: any, data: any, userId?: any) {
    if (userId) data.updated_user_id = toPrimaryKey(userId);
    return this.update(id, data);
  }

  protected async beforeCreate(data: any) {
    const payload = this.preparePayload(data);
    if (payload.code && (await this.menuRepo.findByCode(payload.code))) {
      throw new BadRequestException('Menu code already exists');
    }
    return payload;
  }

  protected async beforeUpdate(id: any, data: any) {
    const current = await this.menuRepo.findById(id);
    if (!current) throw new NotFoundException('Menu not found');

    const payload = this.preparePayload(data);
    if (payload.code && payload.code !== (current as any).code) {
      if (await this.menuRepo.findByCode(payload.code)) {
        throw new BadRequestException('Menu code already exists');
      }
    }
    return payload;
  }

  async getTree(): Promise<MenuTreeItem[]> {
    const menus = await this.menuRepo.findAllWithChildren({});
    return buildMenuTree(menus);
  }

  async getPublicMenuTree(userId?: any): Promise<MenuTreeItem[]> {
    const dbFilter: MenuFilter = {
      status: 'active',
      group: 'client',
    };
    const allMenus = await this.menuRepo.findAllWithChildren(dbFilter);
    const menus = allMenus.filter((m: any) => m.show_in_menu);
    const filtered = filterPublicMenus(menus, userId);
    return buildMenuTree(filtered);
  }

  private preparePayload(data: any): any {
    const payload = { ...data };
    const bigIntFields = ['parent_id', 'created_user_id', 'updated_user_id'];
    bigIntFields.forEach((field) => {
      if (
        payload[field] !== undefined &&
        payload[field] !== null &&
        payload[field] !== ''
      ) {
        payload[field] = toPrimaryKey(payload[field]);
      } else if (payload[field] === '' || payload[field] === null) {
        payload[field] = null;
      }
    });
    return payload;
  }
}
