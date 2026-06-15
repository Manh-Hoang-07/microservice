// ---------------------------------------------------------------------------
// Module mocks — must come before any import
// ---------------------------------------------------------------------------
jest.mock('src/generated/prisma', () => ({ PrismaClient: class {}, Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('src/types', () => ({ toPrimaryKey: (v: any) => BigInt(v) }), { virtual: true });
jest.mock('../../../../src/core/database/prisma.service', () => ({ PrismaService: jest.fn() }), { virtual: true });

import { GroupMemberRoleRepository } from '../../../../src/modules/group/repositories/group-member-role.repository';

function makeRepo(redis?: any) {
  const prisma = {
    groupMemberRole: {
      upsert: jest.fn().mockResolvedValue({}),
      deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
      createMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    $transaction: jest.fn(async (fn: any) => fn(prisma)),
    $queryRaw: jest.fn().mockResolvedValue([{ code: 'post.view' }, { code: 'post.edit' }]),
  } as any;
  const repo = new (GroupMemberRoleRepository as any)(prisma, redis);
  return { repo, prisma };
}

function makeRedis(initial: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initial));
  return {
    store,
    get: jest.fn(async (k: string) => store.get(k) ?? null),
    set: jest.fn(async (k: string, v: string) => { store.set(k, v); }),
    del: jest.fn(async (k: string) => { store.delete(k); }),
    deleteMany: jest.fn(async (keys: string[]) => { keys.forEach((k) => store.delete(k)); }),
    keys: jest.fn(async (pattern: string) => {
      // crude glob: only '*' wildcard
      const rx = new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
      return [...store.keys()].filter((k) => rx.test(k));
    }),
    hgetall: jest.fn(async () => ({ version: '1' })),
  };
}

describe('GroupMemberRoleRepository.getPermissionCodes', () => {
  afterEach(() => jest.clearAllMocks());

  it('cache MISS: runs raw query and writes version-aware key', async () => {
    const redis = makeRedis();
    const { repo, prisma } = makeRepo(redis);

    const codes = await repo.getPermissionCodes('5', '10');

    expect(codes).toEqual(['post.view', 'post.edit']);
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    // version 1 → key carries v1
    expect(redis.set).toHaveBeenCalledWith(
      'iam:v1:group:10:user:5:perm_codes',
      JSON.stringify(['post.view', 'post.edit']),
      60,
    );
  });

  it('cache HIT: returns cached value without touching the DB', async () => {
    const redis = makeRedis({
      'iam:v1:group:10:user:5:perm_codes': JSON.stringify(['cached.only']),
    });
    const { repo, prisma } = makeRepo(redis);

    const codes = await repo.getPermissionCodes('5', '10');

    expect(codes).toEqual(['cached.only']);
    expect(prisma.$queryRaw).not.toHaveBeenCalled();
  });

  it('is version-aware: a bumped rbac:meta.version maps to a different key (old entry ignored)', async () => {
    const redis = makeRedis({
      'iam:v1:group:10:user:5:perm_codes': JSON.stringify(['stale']),
    });
    redis.hgetall.mockResolvedValue({ version: '2' });
    const { repo, prisma } = makeRepo(redis);

    const codes = await repo.getPermissionCodes('5', '10');

    // v2 key is a miss → DB queried, fresh value cached under v2
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    expect(codes).toEqual(['post.view', 'post.edit']);
    expect(redis.set).toHaveBeenCalledWith(
      'iam:v2:group:10:user:5:perm_codes',
      expect.any(String),
      60,
    );
  });

  it('works without redis (Optional): runs the query directly', async () => {
    const { repo, prisma } = makeRepo(undefined);
    const codes = await repo.getPermissionCodes('5', '10');
    expect(codes).toEqual(['post.view', 'post.edit']);
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
  });
});

describe('GroupMemberRoleRepository perm_codes invalidation', () => {
  afterEach(() => jest.clearAllMocks());

  it('assign deletes the (group,user) perm_codes across all versions', async () => {
    const redis = makeRedis({
      'iam:v1:group:10:user:5:perm_codes': 'x',
      'iam:v2:group:10:user:5:perm_codes': 'y',
      'iam:v1:group:10:user:9:perm_codes': 'z', // different user — must survive
    });
    const { repo } = makeRepo(redis);

    await repo.assign('5', '10', '1');

    expect(redis.store.has('iam:v1:group:10:user:5:perm_codes')).toBe(false);
    expect(redis.store.has('iam:v2:group:10:user:5:perm_codes')).toBe(false);
    expect(redis.store.has('iam:v1:group:10:user:9:perm_codes')).toBe(true);
  });

  it('remove deletes the (group,user) perm_codes across all versions', async () => {
    const redis = makeRedis({ 'iam:v3:group:10:user:5:perm_codes': 'x' });
    const { repo } = makeRepo(redis);

    await repo.remove('5', '10', '1');

    expect(redis.store.has('iam:v3:group:10:user:5:perm_codes')).toBe(false);
  });

  it('syncRoles invalidates BOTH role-userids caches and the user perm_codes', async () => {
    const redis = makeRedis({
      'iam:group:10:role:1:user_ids': 'a',
      'iam:group:10:role:2:user_ids': 'b',
      'iam:v1:group:10:user:5:perm_codes': 'x',
    });
    const { repo } = makeRepo(redis);

    await repo.syncRoles('5', '10', ['1', '2']);

    expect(redis.store.has('iam:group:10:role:1:user_ids')).toBe(false);
    expect(redis.store.has('iam:group:10:role:2:user_ids')).toBe(false);
    expect(redis.store.has('iam:v1:group:10:user:5:perm_codes')).toBe(false);
  });
});
