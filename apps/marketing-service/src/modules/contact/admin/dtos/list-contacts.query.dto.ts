import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListContactsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsIn(['Pending', 'Read', 'Replied', 'Closed'])
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;
}
