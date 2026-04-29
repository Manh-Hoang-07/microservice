import { NotFoundException } from '@nestjs/common';
import {
  IPaginatedResult,
  IPaginationOptions,
  createPaginationMeta,
  prepareQuery,
} from './pagination.helper';

export interface IRepository<T> {
  findAll(options?: IPaginationOptions): Promise<IPaginatedResult<T>>;
  findById(id: string | any, options?: IPaginationOptions): Promise<T | null>;
  findManyByIds(ids: (string | any)[]): Promise<T[]>;
  findOne(filter: Record<string, any>): Promise<T | null>;
  findMany(filter?: Record<string, any>, options?: IPaginationOptions): Promise<T[]>;
  create(data: any): Promise<T>;
  update(id: string | any, data: any): Promise<T>;
  updateMany(filter: Record<string, any>, data: any): Promise<{ count: number }>;
  upsert(id: string | any, data: any): Promise<T>;
  delete(id: string | any): Promise<boolean>;
  exists(filter: Record<string, any>): Promise<boolean>;
  count(filter?: Record<string, any>): Promise<number>;
  deleteMany(filter: Record<string, any>): Promise<{ count: number }>;
  findFirstRaw(options: any): Promise<T | null>;
  findManyRaw(options: any): Promise<T[]>;
}

export abstract class BaseService<T, R extends IRepository<T>> {
  constructor(protected readonly repository: R) {}

  protected async beforeCreate(data: any): Promise<any> {
    return { ...data };
  }

  protected async afterCreate(_entity: T, _data: any): Promise<void> {}

  protected async beforeUpdate(_id: any, data: any): Promise<any> {
    return data;
  }

  protected async afterUpdate(_entity: T, _data: any): Promise<void> {}

  protected async beforeDelete(_id: any): Promise<boolean> {
    return true;
  }

  protected async afterDelete(_id: any, _entity?: any): Promise<void> {}

  protected async prepareOptions(
    options: IPaginationOptions,
  ): Promise<IPaginationOptions> {
    const page = Math.max(Number(options.page) || 1, 1);
    const maxLimit = (options as any).maxLimit ?? 100;
    const limit = Math.min(Math.max(Number(options.limit) || 10, 1), maxLimit);
    const sort = options.sort || 'id:DESC';
    return { ...options, page, limit, sort };
  }

  protected async prepareFilters(
    filters?: Record<string, any>,
    _options?: any,
  ): Promise<Record<string, any> | boolean | undefined> {
    return filters;
  }

  protected async afterGetList(
    result: IPaginatedResult<T>,
  ): Promise<IPaginatedResult<T>> {
    return result;
  }

  protected async afterGetOne(entity: T | null): Promise<T | null> {
    return entity;
  }

  async getSimpleList(query: any = {}) {
    const limit = Number(query.limit) || 1000;
    return this.getList({
      ...query,
      limit,
      maxLimit: query.maxLimit || Math.max(limit, 1000),
      skipCount: true,
    });
  }

  protected async executeGetList(
    queryOrOptions: any = {},
  ): Promise<IPaginatedResult<T>> {
    const { filter, options } = prepareQuery(queryOrOptions);
    const normalized = await this.prepareOptions(options);
    const preparedFilters = await this.prepareFilters(filter, normalized);

    if (preparedFilters === false) {
      return {
        data: [],
        meta: createPaginationMeta(
          normalized.page as number,
          normalized.limit as number,
          0,
        ),
      };
    }

    normalized.filter =
      preparedFilters && typeof preparedFilters === 'object'
        ? preparedFilters
        : filter;

    const result = await this.repository.findAll(normalized);
    const transformedData = await Promise.all(
      result.data.map((row) => {
        const t = this.transform(row);
        return t instanceof Promise ? t : Promise.resolve(t as T | null);
      }),
    );
    result.data = transformedData as T[];

    return this.afterGetList(result);
  }

  async getList(queryOrOptions: any = {}): Promise<IPaginatedResult<T>> {
    return this.executeGetList(queryOrOptions);
  }

  async getOne(id: any, options: IPaginationOptions = {}): Promise<T> {
    const entity = await this.repository.findById(id, options);
    if (!entity)
      throw new NotFoundException(`Resource with ID ${id} not found`);

    const transformed = this.transform(entity) as T;
    const final = await this.afterGetOne(transformed);
    if (!final)
      throw new NotFoundException(
        `Resource with ID ${id} not found after processing`,
      );
    return final;
  }

  async create(data: any): Promise<T> {
    const payload = await this.beforeCreate(data);
    const entity = await this.repository.create(payload);
    await this.afterCreate(entity, data);
    return this.transform(entity) as T;
  }

  async update(id: any, data: any): Promise<T> {
    const payload = await this.beforeUpdate(id, data);
    const entity = await this.repository.update(id, payload);
    if (!entity)
      throw new NotFoundException(`Resource with ID ${id} not found to update`);
    await this.afterUpdate(entity, data);
    return this.transform(entity) as T;
  }

  async delete(id: any): Promise<any> {
    const canDelete = await this.beforeDelete(id);
    if (!canDelete) return false;
    const result = await this.repository.delete(id);
    if (result) await this.afterDelete(id);
    return result;
  }

  protected transform(entity: T | null): T | null {
    return entity;
  }
}
