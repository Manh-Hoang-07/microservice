import { PrismaClient } from '../../../src/generated/prisma';

// Group roles: admin tạo sẵn, roleType='group'. Danh sách PHẲNG — không scope
// theo loại nhóm. Chủ nhóm chọn bất kỳ vai trò nào để gán cho thành viên.
const GROUP_ROLES: Array<{
  code: string;
  name: string;
  permissions: string[];
}> = [
  // ── Owner role: đầy đủ quyền nội dung nhóm (tự động gán cho chủ nhóm) ──────
  {
    code: 'group_manager',
    name: 'Quản lý nhóm (đầy đủ)',
    permissions: [
      'post.view', 'post.create', 'post.update', 'post.delete',
      'comic.view', 'comic.create', 'comic.update', 'comic.delete',
      'chapter.view', 'chapter.create', 'chapter.update', 'chapter.delete',
    ],
  },
  // ── Comic groups ──────────────────────────────────────────────────────────
  {
    code: 'group_comic_manager',
    name: 'Quản lý truyện nhóm',
    permissions: [
      'comic.view', 'comic.create', 'comic.update', 'comic.delete',
      'chapter.view', 'chapter.create', 'chapter.update', 'chapter.delete',
    ],
  },
  {
    code: 'group_comic_editor',
    name: 'Biên tập viên truyện',
    permissions: [
      'comic.view', 'comic.update',
      'chapter.view', 'chapter.create', 'chapter.update',
    ],
  },
  {
    code: 'group_comic_translator',
    name: 'Dịch giả',
    permissions: [
      'comic.view',
      'chapter.view', 'chapter.create', 'chapter.update',
    ],
  },
  // ── Post groups ───────────────────────────────────────────────────────────
  {
    code: 'group_post_manager',
    name: 'Quản lý bài viết nhóm',
    permissions: ['post.view', 'post.create', 'post.update', 'post.delete'],
  },
  {
    code: 'group_post_editor',
    name: 'Biên tập viên bài viết',
    permissions: ['post.view', 'post.create', 'post.update'],
  },
  {
    code: 'group_post_writer',
    name: 'Tác giả bài viết',
    permissions: ['post.view', 'post.create', 'post.update'],
  },
];

export async function seedGroupRoles(
  prisma: PrismaClient,
  permMap: Map<string, bigint>,
): Promise<void> {
  for (const def of GROUP_ROLES) {
    // Upsert role with roleType='group'
    let role = await prisma.role.findUnique({ where: { code: def.code } });
    if (!role) {
      role = await prisma.role.create({
        data: { code: def.code, name: def.name, status: 'active', roleType: 'group' },
      });
      console.log(`  ✔ GroupRole created: ${def.code}`);
    } else if (role.roleType !== 'group') {
      role = await prisma.role.update({
        where: { code: def.code },
        data: { roleType: 'group' },
      });
      console.log(`  ✔ GroupRole updated roleType: ${def.code}`);
    } else {
      console.log(`  · GroupRole exists: ${def.code}`);
    }

    // Sync permissions
    const permIds = def.permissions
      .map((c) => permMap.get(c))
      .filter((id): id is bigint => id !== undefined);

    if (permIds.length !== def.permissions.length) {
      const missing = def.permissions.filter((c) => !permMap.has(c));
      console.warn(`  ⚠ Missing permissions for ${def.code}: ${missing.join(', ')}`);
    }

    await prisma.roleHasPermission.deleteMany({ where: { roleId: role.id } });
    if (permIds.length > 0) {
      await prisma.roleHasPermission.createMany({
        data: permIds.map((pid) => ({ roleId: role!.id, permissionId: pid })),
        skipDuplicates: true,
      });
    }
    console.log(`  ✔ ${def.code} → ${permIds.length} permissions linked`);
  }

  console.log(`  ✔ Total group roles: ${GROUP_ROLES.length}`);
}
