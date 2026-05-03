import { IsEnum, IsNotEmpty } from 'class-validator';
import { BannerStatus } from '../../../banner/enums/banner-status.enum';

/**
 * Was previously read as `@Body('status') status: string` with no DTO, no
 * enum check — admin could write any string and silently break the public
 * filter. Constrain to the documented enum.
 */
export class ChangeStatusDto {
  @IsNotEmpty()
  @IsEnum(BannerStatus)
  status: BannerStatus;
}
