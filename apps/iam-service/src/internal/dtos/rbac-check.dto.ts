import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const NUMERIC_ID = /^\d{1,20}$/;
const PERM_CODE = /^[a-z][a-z0-9_.-]{0,119}$/i;

export class RbacCheckDto {
  @IsString()
  @Matches(NUMERIC_ID, { message: 'userId must be numeric.' })
  userId: string;

  @IsOptional()
  @IsString()
  @Matches(NUMERIC_ID, { message: 'groupId must be numeric.' })
  groupId?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ArrayMaxSize(64)
  @IsString({ each: true })
  @Matches(PERM_CODE, { each: true, message: 'Invalid permission code.' })
  @MaxLength(120, { each: true })
  permissions: string[];
}
