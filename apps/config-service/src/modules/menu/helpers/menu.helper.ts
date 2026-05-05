import { MenuTreeItem } from '../interfaces/menu-tree-item.interface';

interface MenuTreeItemWithSort extends MenuTreeItem {
  __sort_order: number;
}

/**
 * Build a tree from a flat list. Stash `sort_order` on each tree item so
 * sortTree compares in O(n log n) rather than rescanning the source array
 * on every comparator call. Orphaned children (parent_id points outside
 * the input set, e.g. parent was filtered out) are dropped, NOT promoted
 * to roots — promoting them used to leak filtered-out subtrees up to the
 * top level of the public menu.
 */
export function buildMenuTree(menus: any[]): MenuTreeItem[] {
  const menuMap = new Map<string, MenuTreeItemWithSort>();
  const rootMenus: MenuTreeItemWithSort[] = [];

  menus.forEach((menu) => {
    menuMap.set(String(menu.id), {
      id: menu.id,
      code: menu.code,
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      type: menu.type,
      status: menu.status,
      is_public: !!menu.is_public,
      children: [],
      allowed: true,
      __sort_order: typeof menu.sort_order === 'number' ? menu.sort_order : 0,
    });
  });

  menus.forEach((menu) => {
    const item = menuMap.get(String(menu.id))!;
    const parentId = menu.parent_id != null ? String(menu.parent_id) : null;

    if (parentId == null) {
      rootMenus.push(item);
    } else if (menuMap.has(parentId)) {
      menuMap.get(parentId)!.children!.push(item);
    }
    // else: parent missing (filtered out / deleted) → drop the orphan
  });

  const sortTree = (items: MenuTreeItemWithSort[]) => {
    items.sort((a, b) => a.__sort_order - b.__sort_order);
    items.forEach((item) => {
      if (item.children?.length) sortTree(item.children as MenuTreeItemWithSort[]);
      delete (item as any).__sort_order;
    });
  };

  sortTree(rootMenus);
  return rootMenus;
}

/**
 * Pre-tree filter for the public endpoint. Anonymous users may only see
 * `is_public=true` menus. Authenticated callers still need their permission
 * codes checked — granting any logged-in user access to admin menus was a
 * permission leak.
 */
export function filterPublicMenus(menus: any[], userPermissions?: Set<string>): any[] {
  return menus.filter((menu) => {
    if (menu.is_public) return true;
    if (!userPermissions) return false;
    // No permission code on a non-public menu → not visible.
    if (!menu.required_permission_code) return false;
    return userPermissions.has(menu.required_permission_code);
  });
}

/**
 * Pre-tree filter for authenticated user menus. Unlike the public filter,
 * menus without `required_permission_code` are shown to any logged-in user.
 * Menus with a code require the user to hold that permission.
 */
export function filterUserMenus(menus: any[], userPermissions: Set<string>): any[] {
  return menus.filter((menu) => {
    if (menu.is_public) return true;
    if (!menu.required_permission_code) return true;
    return userPermissions.has(menu.required_permission_code);
  });
}
