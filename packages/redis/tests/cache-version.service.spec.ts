import { CacheVersionService } from '../src/cache-version.service';

describe('CacheVersionService (shared, namespace-agnostic)', () => {
  it('bumps the version key via incr using the full caller-supplied key', async () => {
    const redis = {
      isEnabled: () => true,
      incr: jest.fn().mockResolvedValue(1),
    };
    const svc = new CacheVersionService(redis as any);

    await svc.bump('cms:public:banners');

    expect(redis.incr).toHaveBeenCalledWith('cms:public:banners:ver');
  });

  it('scopes the version key per full key', async () => {
    const redis = { isEnabled: () => true, incr: jest.fn().mockResolvedValue(1) };
    const svc = new CacheVersionService(redis as any);

    await svc.bump('config:public:country');
    await svc.bump('config:public:province');

    expect(redis.incr).toHaveBeenNthCalledWith(1, 'config:public:country:ver');
    expect(redis.incr).toHaveBeenNthCalledWith(2, 'config:public:province:ver');
  });

  it('getVersion reads the counter and returns a number', async () => {
    const redis = { isEnabled: () => true, get: jest.fn().mockResolvedValue('7') };
    const svc = new CacheVersionService(redis as any);

    await expect(svc.getVersion('comic:public:list')).resolves.toBe(7);
    expect(redis.get).toHaveBeenCalledWith('comic:public:list:ver');
  });

  it('getVersion returns 0 when the key is unset or non-numeric', async () => {
    const redis = { isEnabled: () => true, get: jest.fn().mockResolvedValue(null) };
    const svc = new CacheVersionService(redis as any);

    await expect(svc.getVersion('comic:public:list')).resolves.toBe(0);
  });

  it('is a no-op / returns 0 when Redis is disabled', async () => {
    const redis = { isEnabled: () => false, incr: jest.fn(), get: jest.fn() };
    const svc = new CacheVersionService(redis as any);

    await svc.bump('cms:public:staff');
    expect(redis.incr).not.toHaveBeenCalled();
    await expect(svc.getVersion('cms:public:staff')).resolves.toBe(0);
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('is a no-op when Redis is not injected', async () => {
    const svc = new CacheVersionService(undefined);
    await expect(svc.bump('cms:public:partner')).resolves.toBeUndefined();
    await expect(svc.getVersion('cms:public:partner')).resolves.toBe(0);
  });

  it('swallows incr errors so writes never fail on cache problems', async () => {
    const redis = { isEnabled: () => true, incr: jest.fn().mockRejectedValue(new Error('boom')) };
    const svc = new CacheVersionService(redis as any);

    await expect(svc.bump('cms:public:gallery')).resolves.toBeUndefined();
  });
});
