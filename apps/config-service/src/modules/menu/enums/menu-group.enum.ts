export enum MenuContext {
  admin = 'admin',
  client = 'client',
  group = 'group',
}

export const MenuContextOptions = [
  { id: MenuContext.admin, name: 'Admin - Quản trị' },
  { id: MenuContext.client, name: 'Client - Website' },
  { id: MenuContext.group, name: 'Group - Nhóm' },
];
