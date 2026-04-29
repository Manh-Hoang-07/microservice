export { PaginationMeta, IPaginatedResult, IPaginationOptions } from '../interfaces/pagination.interface';
import { PaginationMeta } from '../interfaces/pagination.interface';

export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;
  return {
    page,
    limit,
    totalItems: total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    nextPage: page < totalPages ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
  };
}

export function prepareQuery(query: any = {}): { filter: any; options: any } {
  if (!query || typeof query !== 'object') {
    return { filter: {}, options: {} };
  }

  const {
    page,
    limit,
    sort,
    sort_by,
    sort_order,
    sortBy,
    sortOrder,
    format,
    filters,
    filter: nestedFilter,
    options,
    maxLimit,
    skipCount,
    ...flatFilters
  } = query;

  const rootOptions: any = {};
  if (page !== undefined) rootOptions.page = Number(page);
  if (limit !== undefined) rootOptions.limit = Number(limit);
  if (sort !== undefined) rootOptions.sort = sort;
  if (format !== undefined) rootOptions.format = format;
  if (maxLimit !== undefined) rootOptions.maxLimit = Number(maxLimit);
  if (skipCount !== undefined)
    rootOptions.skipCount = skipCount === 'true' || skipCount === true;

  const finalSortBy = sort_by || sortBy;
  const finalSortOrder = sort_order || sortOrder || 'DESC';
  if (finalSortBy && !sort) {
    const order = finalSortOrder.toUpperCase();
    rootOptions.sort = `${finalSortBy}:${order}`;
  }

  const finalOptions = { ...rootOptions, ...(options || {}) };
  const finalFilters = {
    ...flatFilters,
    ...(filters || {}),
    ...(nestedFilter || {}),
  };

  return { filter: finalFilters, options: finalOptions };
}
