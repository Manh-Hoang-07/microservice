export enum MenuType {
  route = 'route',
  group = 'group',
  link = 'link',
}

export const MenuTypeOptions = [
  { id: MenuType.route, name: 'Route (Nội bộ)' },
  { id: MenuType.group, name: 'Group (Nhóm)' },
  { id: MenuType.link, name: 'Link (Bên ngoài)' },
];
