import { Injectable, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { MenuService } from '../../admin/services/menu.service';

@Injectable()
export class PublicMenuService {
  private readonly inflight = new Map<string, Promise<any>>();

  constructor(
    private readonly menuService: MenuService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getPublicMenuTree() {
    return this.getOrSet('config:public:menu', 600, async () => {
      return this.menuService.getPublicMenuTree();
    });
  }

  private async getOrSet<T>(key: string, ttl: number, factory: () => Promise<T>): Promise<T> {
    try {
      if (this.redis?.isEnabled()) {
        const raw = await this.redis.get(key);
        if (raw) return JSON.parse(raw);
      }
    } catch {}

    const existing = this.inflight.get(key);
    if (existing) return existing as Promise<T>;

    const promise = factory().then(async (result) => {
      try {
        if (this.redis?.isEnabled()) {
          await this.redis.set(
            key,
            JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
            ttl,
          );
        }
      } catch {}
      return result;
    }).finally(() => {
      this.inflight.delete(key);
    });

    this.inflight.set(key, promise);
    return promise;
  }
}
