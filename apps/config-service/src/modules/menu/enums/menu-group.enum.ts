export enum MenuGroup {
  admin = 'admin',
  client = 'client',
  group = 'group',
}

export const MenuGroupOptions = [
  { id: MenuGroup.admin, name: 'Admin - Quản trị' },
  { id: MenuGroup.client, name: 'Client - Website' },
  { id: MenuGroup.group, name: 'Group - Nhóm' },
];
