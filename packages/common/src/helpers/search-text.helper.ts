/**
 * Sinh chuỗi searchText từ nhiều trường.
 *
 * Tất cả giá trị được lowercase + trim + join bằng dấu cách.
 * Lưu vào cột search_text trong DB và đánh index để tìm kiếm nhanh.
 *
 * @example
 * buildSearchText('John Doe', 'john@email.com', 'johndoe', '0912345678')
 * // → "john doe john@email.com johndoe 0912345678"
 */
export function buildSearchText(...fields: (string | null | undefined)[]): string {
  return fields
    .filter((f): f is string => typeof f === 'string' && f.trim().length > 0)
    .map(f => f.trim().toLowerCase())
    .join(' ');
}

/** Default cap for a user-supplied search term in a repository `contains`/`LIKE`. */
export const MAX_SEARCH_LENGTH = 100;

/**
 * Cap a user-supplied search term to a safe length before it reaches a DB
 * `contains`/`startsWith`/`LIKE`. An unbounded term lets a client force
 * expensive full-column scans — a cheap DoS. Trims first, then truncates.
 *
 * @example where.OR = [{ name: { contains: capSearch(filter.search), mode: 'insensitive' } }]
 */
export function capSearch(term: string | null | undefined, max = MAX_SEARCH_LENGTH): string {
  if (typeof term !== 'string') return '';
  return term.trim().slice(0, max);
}
