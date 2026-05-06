import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, MaxLength, Min, Max } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class SearchQueryDto extends BaseListQueryDto {
  /**
   * Search term. Capped at 200 chars and trimmed; control characters are
   * stripped to defeat header injection if it ever lands in a logged URL.
   */
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.trim().replace(/[\x00-\x1f\x7f]/g, '').slice(0, 200)
      : '',
  )
  @MaxLength(200)
  q?: string = '';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  declare page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  declare limit?: number;
}
