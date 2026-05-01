import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ProvinceRepository, ProvinceFilter } from '../../repositories/province.repository';
import { createPaginationMeta, parseQueryOptions } from '@package/common';

@Injectable()
export class ProvinceService {
  constructor(
    private readonly provinceRepo: ProvinceRepository,
    private readonly i18n: I18nService,
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
    return this.provinceRepo.create(dto);
  }

  async update(id: any, dto: any) {
    await this.getOne(id);
    return this.provinceRepo.update(id, dto);
  }

  async delete(id: any) {
    await this.getOne(id);
    await this.provinceRepo.delete(id);
    return true;
  }
}
