jest.mock('@package/circuit-breaker', () => ({
  createCircuitBreaker: jest.fn(() => ({
    execute: jest.fn((fn: () => any) => fn()),
    onBreak: jest.fn(),
  })),
}));

jest.mock('@package/redis', () => ({ RedisService: jest.fn() }));

import { IamClient } from '../../src/clients/iam.client';

function makeClient(overrides: {
  baseUrl?: string;
  redisGet?: any;
  redisSet?: any;
  redisHgetall?: any;
  redisEnabled?: boolean;
} = {}) {
  const redis: any = {
    get: overrides.redisGet ?? jest.fn().mockResolvedValue(null),
    set: overrides.redisSet ?? jest.fn().mockResolvedValue('OK'),
    hgetall: overrides.redisHgetall ?? jest.fn().mockResolvedValue({ version: '1' }),
    isEnabled: jest.fn().mockReturnValue(overrides.redisEnabled ?? true),
  };
  // Mimic RedisService.getOrSet behavior in tests: cache hit returns parsed
  // value; cache miss runs factory and stores result with TTL.
  redis.getOrSet = jest.fn().mockImplementation(async (key: string, factory: () => any, ttl: number) => {
    const cached = await redis.get(key);
    if (cached !== null && cached !== undefined) return JSON.parse(cached);
    const fresh = await factory();
    await redis.set(key, JSON.stringify(fresh), ttl);
    return fresh;
  });

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

    const result = await client.checkPermissions('user-1', ['users.manage']);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://iam:3002/internal/rbac/check',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(redis.set).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('cache key inclui version de rbac:meta', async () => {
    const { client, redis } = makeClient({
      redisHgetall: jest.fn().mockResolvedValue({ version: '7' }),
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { allowed: true } }),
    }) as any;

    await client.checkPermissions('user-1', ['users.manage']);

    expect(redis.set).toHaveBeenCalledWith(
      expect.stringMatching(/^rbac:client:v7:user-1:users\.manage$/),
      expect.any(String),
      expect.any(Number),
    );
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
