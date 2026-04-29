import { IsString, IsOptional, IsEnum, MaxLength } from 'class-validator';

export enum TemplateType {
  email = 'email',
  telegram = 'telegram',
  zalo = 'zalo',
  sms = 'sms',
}

export enum TemplateCategory {
  render = 'render',
  file = 'file',
}

export class CreateContentTemplateDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsEnum(TemplateCategory)
  category?: TemplateCategory;

  @IsEnum(TemplateType)
  type: TemplateType;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  file_path?: string;

  @IsOptional()
  metadata?: any;

  @IsOptional()
  variables?: any;
}
