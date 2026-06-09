import { IsString, Matches } from 'class-validator';

export class GroupPermissionQueryDto {
  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'userId must be numeric.' })
  userId: string;

  @IsString()
  @Matches(/^\d{1,20}$/, { message: 'groupId must be numeric.' })
  groupId: string;

  @IsString()
  @Matches(/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/, {
    message: 'permission must be in format module.action (e.g. post.update).',
  })
  permission: string;
}
