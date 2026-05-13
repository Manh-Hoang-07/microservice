import { IsEnum, IsOptional } from 'class-validator';
import { BaseListQueryDto } from '@package/common';
import { TemplateType } from '../../enums/template-type.enum';
import { TemplateCategory } from '../../enums/template-category.enum';
import { TemplateStatus } from '../../enums/template-status.enum';

export class ListContentTemplatesAdminQueryDto extends BaseListQueryDto {
  @IsOptional()
  @IsEnum(TemplateType)
  type?: TemplateType;

  @IsOptional()
  @IsEnum(TemplateCategory)
  category?: TemplateCategory;

  @IsOptional()
  @IsEnum(TemplateStatus)
  status?: TemplateStatus;
}
