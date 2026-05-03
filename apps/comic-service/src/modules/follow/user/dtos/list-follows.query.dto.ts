import { BaseListQueryDto } from '@package/common';

/**
 * Follow list is always scoped to the authenticated user (`user_id` from the
 * JWT subject). The service does not consume any other query fields beyond
 * what `BaseListQueryDto` already covers, so no extra filters are declared.
 */
export class ListFollowsQueryDto extends BaseListQueryDto {}
