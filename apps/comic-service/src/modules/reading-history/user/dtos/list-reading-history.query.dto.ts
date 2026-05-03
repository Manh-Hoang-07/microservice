import { BaseListQueryDto } from '@package/common';

/**
 * The service only filters by the authenticated user (taken from the JWT,
 * never from the query string), so no module-specific filter fields exist.
 * Pagination + `search`/`sort`/`skipCount` come from `BaseListQueryDto`.
 */
export class ListReadingHistoryQueryDto extends BaseListQueryDto {}
