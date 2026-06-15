jest.mock('src/generated/prisma', () => ({ Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('src/types', () => ({
  toPrimaryKey: (v: any) => BigInt(v),
}), { virtual: true });
jest.mock('../../../../src/core/database/prisma.service', () => ({
  PrismaService: jest.fn(),
}));

import { GroupRepository } from '../../../../src/modules/group/repositories/group.repository';

function makeRepo(redis?: any) {
  const prisma = {
    userGroup: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  } as any;
  const repo = new (GroupRepository as any)(prisma, redis);
  return { repo, prisma };
}

describe('GroupRepository.findMemberIds', () => {
  afterEach(() => jest.clearAllMocks());

  it('retorna lista de userIds como bigint, com cap de fetch', async () => {
    const { repo, prisma } = makeRepo();
    prisma.userGroup.findMany.mockResolvedValue([
      { userId: 1n },
      { userId: 3n },
      { userId: 7n },
    ]);

    const result = await repo.findMemberIds(5n);

    expect(prisma.userGroup.findMany).toHaveBeenCalledWith({
      where: { groupId: 5n },
      select: { userId: true },
      take: 500,
    });
    expect(result).toEqual([1n, 3n, 7n]);
  });

  it('retorna array vazio quando grupo não tem membros', async () => {
    const { repo, prisma } = makeRepo();
    prisma.userGroup.findMany.mockResolvedValue([]);

    const result = await repo.findMemberIds(99n);

    expect(result).toEqual([]);
  });

  it('usa cache do Redis quando disponível (sem tocar no DB)', async () => {
    const redis = {
      get: jest.fn().mockResolvedValue(JSON.stringify(['2', '4'])),
      set: jest.fn(),
    };
    const { repo, prisma } = makeRepo(redis);

    const result = await repo.findMemberIds(5n);

    expect(redis.get).toHaveBeenCalledWith('iam:group:5:member_ids');
    expect(prisma.userGroup.findMany).not.toHaveBeenCalled();
    expect(result).toEqual([2n, 4n]);
  });

  it('escreve no cache após buscar do DB', async () => {
    const redis = { get: jest.fn().mockResolvedValue(null), set: jest.fn() };
    const { repo, prisma } = makeRepo(redis);
    prisma.userGroup.findMany.mockResolvedValue([{ userId: 1n }, { userId: 9n }]);

    await repo.findMemberIds(5n);

    expect(redis.set).toHaveBeenCalledWith(
      'iam:group:5:member_ids',
      JSON.stringify(['1', '9']),
      60,
    );
  });
});

describe('GroupRepository — my groups paginado', () => {
  afterEach(() => jest.clearAllMocks());

  it('findUserGroupsPaged aplica skip/take e busca por nome', async () => {
    const { repo, prisma } = makeRepo();
    prisma.userGroup.findMany.mockResolvedValue([]);

    await repo.findUserGroupsPaged(7n, { skip: 10, take: 5, search: 'abc' });

    const call = prisma.userGroup.findMany.mock.calls[0][0];
    expect(call.skip).toBe(10);
    expect(call.take).toBe(5);
    expect(call.where).toEqual({
      userId: 7n,
      group: { name: { contains: 'abc', mode: 'insensitive' } },
    });
  });

  it('countUserGroups sem search filtra apenas por userId', async () => {
    const { repo, prisma } = makeRepo();
    prisma.userGroup.count.mockResolvedValue(3);

    const total = await repo.countUserGroups(7n);

    expect(prisma.userGroup.count).toHaveBeenCalledWith({ where: { userId: 7n } });
    expect(total).toBe(3);
  });
});
