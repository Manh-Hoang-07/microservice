import { MenuTreeItem } from '../interfaces/menu-tree-item.interface';

export function buildMenuTree(menus: any[]): MenuTreeItem[] {
  const menuMap = new Map<any, MenuTreeItem>();
  const rootMenus: MenuTreeItem[] = [];

  menus.forEach((menu) => {
    const id = menu.id;
    menuMap.set(id, {
      id,
      code: menu.code,
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      type: menu.type,
      status: menu.status,
      is_public: !!menu.is_public,
      children: [],
      allowed: true,
    } as MenuTreeItem);
  });

  menus.forEach((menu) => {
    const item = menuMap.get(menu.id)!;
    const parentId = menu.parent_id;

    if (parentId && menuMap.has(parentId)) {
      menuMap.get(parentId)!.children!.push(item);
    } else {
      rootMenus.push(item);
    }
  });

  const sortTree = (items: MenuTreeItem[]) => {
    items.sort((a, b) => {
      const menuA = menus.find((m) => String(m.id) === String(a.id));
      const menuB = menus.find((m) => String(m.id) === String(b.id));
      return (menuA?.sort_order || 0) - (menuB?.sort_order || 0);
    });
    items.forEach((item) => {
      if (item.children?.length) {
        sortTree(item.children);
      }
    });
  };

  sortTree(rootMenus);
  return rootMenus;
}

export function filterPublicMenus(menus: any[], userId?: any): any[] {
  return menus.filter((menu) => {
    if (menu.is_public) return true;
    if (userId) return true;
    return false;
  });
}
