jest.mock('@package/circuit-breaker', () => ({
  createCircuitBreaker: jest.fn(() => ({
    execute: jest.fn((fn: () => any) => fn()),
    onBreak: jest.fn(),
  })),
}));

jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

import { IamClient } from '../../src/clients/iam.client';

function makeClient(overrides: { baseUrl?: string; redisGet?: any; redisSet?: any } = {}) {
  const redis = {
    get: overrides.redisGet ?? jest.fn().mockResolvedValue(null),
    set: overrides.redisSet ?? jest.fn().mockResolvedValue('OK'),
  } as any;

  const config = {
    get: jest.fn((key: string, def = '') => {
      if (key === 'IAM_INTERNAL_URL') return overrides.baseUrl ?? 'http://iam:3002';
      if (key === 'INTERNAL_API_SECRET') return 'secret-key';
      return def;
    }),
  } as any;

  const client = new IamClient(config, redis);
  client.onModuleInit();
  return { client, redis };
}

describe('IamClient.checkPermissions', () => {
  afterEach(() => jest.clearAllMocks());

  it('retorna resultado do cache Redis quando disponível', async () => {
    const { client, redis } = makeClient({
      redisGet: jest.fn().mockResolvedValue(JSON.stringify({ allowed: true })),
    });

    const result = await client.checkPermissions('user-1', ['users.manage']);

    expect(redis.get).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('chama IAM quando cache miss e armazena resultado', async () => {
    const { client, redis } = makeClient();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { allowed: true } }),
    }) as any;

    const result = await client.checkPermissions('user-1', ['users.manage'], 'group-5');

    expect(global.fetch).toHaveBeenCalledWith(
      'http://iam:3002/internal/rbac/check',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(redis.set).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('retorna false quando IAM retorna allowed=false', async () => {
    const { client } = makeClient();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { allowed: false } }),
    }) as any;

    const result = await client.checkPermissions('user-1', ['users.delete']);
    expect(result).toBe(false);
  });

  it('continua quando Redis está indisponível', async () => {
    const { client } = makeClient({
      redisGet: jest.fn().mockRejectedValue(new Error('Redis down')),
      redisSet: jest.fn().mockRejectedValue(new Error('Redis down')),
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { allowed: true } }),
    }) as any;

    const result = await client.checkPermissions('user-1', ['users.manage']);
    expect(result).toBe(true);
  });
});
