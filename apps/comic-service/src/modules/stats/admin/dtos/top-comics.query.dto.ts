import { IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { StatsSortBy } from '../../enums/stats-sort-by.enum';

/**
 * Query for the admin "top comics" leaderboard.
 *
 * The service only consumes `limit` (from `BaseListQueryDto`) and `sort_by`,
 * mapping `sort_by` to one of three Prisma `orderBy` clauses. Anything else
 * would be rejected by the global `forbidNonWhitelisted` ValidationPipe.
 */
export class TopComicsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(StatsSortBy)
  sort_by?: StatsSortBy;
}
