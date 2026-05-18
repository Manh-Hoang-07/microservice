import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { ContactStatus } from '../../enums/contact-status.enum';

export class ListContactsAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;
}
