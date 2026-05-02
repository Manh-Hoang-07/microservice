import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { MenuType } from '../../enums/menu-type.enum';
import { BasicStatus } from '../../enums/basic-status.enum';

// `Type(() => Boolean)` calls `Boolean('false')` which returns true. Use a
// manual transform that recognises the string forms `true|false|1|0`.
const toBool = ({ value }: { value: any }) =>
  value === true || value === 'true' || value === '1' || value === 1;

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty({ message: 'Menu code is required' })
  @Length(3, 120, { message: 'Menu code must be between 3 and 120 characters' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'Menu name is required' })
  @MaxLength(150, { message: 'Menu name must not exceed 150 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Path must not exceed 255 characters' })
  path?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'API path must not exceed 255 characters' })
  api_path?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120, { message: 'Icon must not exceed 120 characters' })
  icon?: string;

  @IsOptional()
  @IsEnum(MenuType, { message: 'Type must be one of: route, group, link' })
  type?: MenuType;

  @IsOptional()
  @IsEnum(BasicStatus, { message: 'Status must be one of: active, inactive' })
  status?: BasicStatus;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'parent_id must be numeric.' })
  parent_id?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  sort_order?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(toBool)
  is_public?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(toBool)
  show_in_menu?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  required_permission_code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Group must not exceed 50 characters' })
  group?: string;
}
