import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ProvinceRepository, ProvinceFilter } from '../../repositories/province.repository';
import { createPaginationMeta, parseQueryOptions } from '@package/common';
import { CacheVersionService } from '@package/redis';

@Injectable()
export class ProvinceService {
  constructor(
    private readonly provinceRepo: ProvinceRepository,
    private readonly i18n: I18nService,
    private readonly cacheVersion: CacheVersionService,
  ) {}

  async getList(query: any = {}) {
    const options = parseQueryOptions(query);

    const filter: ProvinceFilter = {};
    if (query.name) filter.name = query.name;
    if (query.status) filter.status = query.status;
    if (query.code) filter.code = query.code;
    if (query.countryId) filter.countryId = query.countryId;

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
    // Bump the version counter — invalidates every cached province query variant
    // (keyed by filter+options) in one incr, instead of scanning keys.
    await this.cacheVersion.bump('config:public:provinces');
  }
}
