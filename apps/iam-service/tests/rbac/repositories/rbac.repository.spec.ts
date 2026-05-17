jest.mock('src/generated/prisma', () => ({ Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('../../../src/core/database/prisma.service', () => ({ PrismaService: jest.fn() }));
jest.mock('src/types', () => ({ toPrimaryKey: (v) => BigInt(v) }), { virtual: true });

import { RbacRepository } from '../../../src/rbac/repositories/rbac.repository';

function makeRepo() {
  const mockPrisma: any = {
    role: { findFirst: jest.fn() },
    userRoleAssignment: { deleteMany: jest.fn() },
  };
  return { repo: new RbacRepository(mockPrisma), mockPrisma };
}

describe('RbacRepository — findRoleByCode', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns active role when found', async () => {
    const { repo, mockPrisma } = makeRepo();
    const role = { id: BigInt(10), code: 'group_owner' };
    mockPrisma.role.findFirst.mockResolvedValue(role);

    const result = await repo.findRoleByCode('group_owner');

    expect(result).toEqual(role);
    expect(mockPrisma.role.findFirst).toHaveBeenCalledWith({
      where: { code: 'group_owner', status: 'active' },
    });
  });

  it('returns null when role not found', async () => {
    const { repo, mockPrisma } = makeRepo();
    mockPrisma.role.findFirst.mockResolvedValue(null);

    expect(await repo.findRoleByCode('nonexistent')).toBeNull();
  });
});

