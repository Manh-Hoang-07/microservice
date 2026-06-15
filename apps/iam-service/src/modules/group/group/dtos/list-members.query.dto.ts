import { IsOptional, IsString } from 'class-validator';
import { BaseListQueryDto } from '@package/common';

export class ListMembersQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsString()
  roleId?: string;
}
