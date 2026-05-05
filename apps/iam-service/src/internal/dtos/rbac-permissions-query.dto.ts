import { IsOptional, IsString, Matches } from 'class-validator';

const NUMERIC_ID = /^\d{1,20}$/;

export class RbacPermissionsQueryDto {
  @IsString()
  @Matches(NUMERIC_ID, { message: 'userId must be numeric.' })
  userId: string;

  @IsOptional()
  @IsString()
  @Matches(NUMERIC_ID, { message: 'groupId must be numeric.' })
  groupId?: string;
}
