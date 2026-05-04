import { Injectable } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class PublicCategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly redis: RedisService,
  ) {}

  async getAll() {
    const cacheKey = 'comic:public:categories';
    try {
      if (this.redis.isEnabled()) {
        const raw = await this.redis.get(cacheKey);
        if (raw) return JSON.parse(raw);
      }
    } catch {
      // silent
    }

    const data = await this.categoryRepo.findAll();
    const result = { data };

    try {
      if (this.redis.isEnabled()) {
        await this.redis.set(
          cacheKey,
          JSON.stringify(result, (_, v) => (typeof v === 'bigint' ? Number(v) : v)),
          600,
        );
      }
    } catch {
      // silent
    }

    return result;
  }
}
