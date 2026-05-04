import { ConflictException, Injectable, Logger, NotFoundException, Optional } from '@nestjs/common';
import { RedisService } from '@package/redis';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ProvinceRepository, ProvinceFilter } from '../../repositories/province.repository';
import { createPaginationMeta, parseQueryOptions } from '@package/common';

@Injectable()
export class ProvinceService {
  private readonly logger = new Logger(ProvinceService.name);

  constructor(
    private readonly provinceRepo: ProvinceRepository,
    private readonly i18n: I18nService,
    @Optional() private readonly redis?: RedisService,
  ) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ProvinceFilter = {};
    if (query.name) filter.name = query.name;
    if (query.status) filter.status = query.status;
    if (query.code) filter.code = query.code;
    if (query.country_id) filter.country_id = query.country_id;

    const skipCount = query.skipCount === true || query.skipCount === 'true';
    const [data, total] = await Promise.all([
      this.provinceRepo.findMany(filter, options),
      skipCount ? Promise.resolve(0) : this.provinceRepo.count(filter),
    ]);

    return { data, meta: createPaginationMeta(options, total) };
  }

  async getSimpleList(query: any = {}) {
    return this.getList({ ...query, limit: query.limit ?? 1000, skipCount: true });
  }

  async getOne(id: any) {
    const item = await this.provinceRepo.findById(id);
    if (!item) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new NotFoundException(
        this.i18n.t('location.PROVINCE_NOT_FOUND', { lang, args: { id: String(id) } }),
      );
    }
    return item;
  }

  async create(dto: any) {
    const created = await this.provinceRepo.create(dto);
    await this.clearProvinceCaches();
    return created;
  }

  async update(id: any, dto: any) {
    await this.getOne(id);
    const updated = await this.provinceRepo.update(id, dto);
    await this.clearProvinceCaches();
    return updated;
  }

  async delete(id: any) {
    await this.getOne(id);
    // Province → Ward FK is Cascade per schema, but we still warn the
    // operator about destructive action by surfacing how many wards will
    // be removed alongside, instead of silently cascading.
    const wardCount = await this.provinceRepo.countWards(id);
    if (wardCount > 0) {
      const lang = I18nContext.current()?.lang ?? 'en';
      throw new ConflictException(
        this.i18n.t('location.PROVINCE_HAS_WARDS', { lang, args: { count: wardCount } }),
      );
    }
    await this.provinceRepo.delete(id);
    await this.clearProvinceCaches();
    return true;
  }

  private async clearProvinceCaches(): Promise<void> {
    try {
      // Clear all province-related cache keys (provinces:all, provinces:{countryId})
      const keys = await this.redis?.keys('config:public:provinces:*');
      if (keys?.length) await this.redis?.deleteMany(keys);
    } catch (err) {
      this.logger.warn('Failed to clear province caches', (err as Error).message);
    }
  }
}
