// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------
jest.mock('@package/common', () => ({
  t: (_, key) => key,
  session: jest.fn(),
}));

jest.mock('@package/bootstrap', () => ({ FileLogger: jest.fn() }));

jest.mock('nestjs-i18n', () => ({
  I18nContext: { current: () => ({ lang: 'en' }) },
  I18nService: jest.fn(),
}));

jest.mock('src/types', () => ({
  toPrimaryKey: (v) => BigInt(v),
}), { virtual: true });

jest.mock('src/generated/prisma', () => ({ PrismaClient: jest.fn(), Prisma: {} }), { virtual: true });
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('../../../../../src/core/database/prisma.service', () => ({ PrismaService: jest.fn() }));
jest.mock('../../../../../src/modules/group/repositories/group.repository', () => ({ GroupRepository: jest.fn() }));
jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { GroupOwnerGuard } from '../../../../../src/modules/group/owner/guards/group-owner.guard';
import { session } from '@package/common';

const mockSession = session as jest.Mock;

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
function makeGuard(group: any) {
  const groupRepo = {
    findById: jest.fn().mockResolvedValue(group),
  } as any;
  const i18n = {} as any;
  return { guard: new GroupOwnerGuard(groupRepo, i18n), groupRepo };
}

function makeCtx(params: Record<string, string>, userId: string | null) {
  mockSession.mockReturnValue(userId ? { userId } : null);
  const request: any = { params, group: undefined };
  return {
    switchToHttp: () => ({ getRequest: () => request }),
    request,
  } as any;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('GroupOwnerGuard', () => {
  afterEach(() => jest.clearAllMocks());

  it('throws NotFoundException when group does not exist', async () => {
    const { guard } = makeGuard(null);
    const ctx = makeCtx({ id: '10' }, '1');
    await expect(guard.canActivate(ctx)).rejects.toThrow(NotFoundException);
  });

  it('returns false when no session userId', async () => {
    const { guard } = makeGuard({ id: 10n, ownerId: 1n, contextId: 5n });
    const ctx = makeCtx({ id: '10' }, null);
    await expect(guard.canActivate(ctx)).resolves.toBe(false);
  });

  it('throws ForbiddenException when caller is not the owner', async () => {
    const { guard } = makeGuard({ id: 10n, ownerId: 1n, contextId: 5n });
    const ctx = makeCtx({ id: '10' }, '2'); // userId=2, ownerId=1
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('allows access and attaches group to request when caller is owner', async () => {
    const group = { id: 10n, ownerId: 1n, contextId: 5n };
    const { guard } = makeGuard(group);
    const ctx = makeCtx({ id: '10' }, '1');
    const result = await guard.canActivate(ctx);
    expect(result).toBe(true);
    expect(ctx.request.group).toEqual(group);
  });

  it('returns false when id param is missing', async () => {
    const { guard } = makeGuard({ id: 10n, ownerId: 1n });
    const ctx = makeCtx({}, '1');
    await expect(guard.canActivate(ctx)).resolves.toBe(false);
  });
});
