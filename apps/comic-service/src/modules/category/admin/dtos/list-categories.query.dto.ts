import { BaseListQueryDto } from '@package/common';

/**
 * Admin listing for comic categories.
 *
 * The service only consumes pagination + `search` + `skipCount`, all of which
 * already live on `BaseListQueryDto`. No module-specific filter fields exist
 * here today, so the DTO is intentionally empty — adding speculative fields
 * would let `forbidNonWhitelisted: true` reject otherwise-valid requests once
 * the frontend starts sending them with a different shape.
 */
export class ListCategoriesAdminQueryDto extends BaseListQueryDto {}
