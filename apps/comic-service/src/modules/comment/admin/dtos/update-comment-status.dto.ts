import { IsIn, IsNotEmpty, IsString } from 'class-validator';

/**
 * Public comment listing filters by `status='visible'`. Allowing arbitrary
 * status strings here let an admin (or anyone bypassing the UI) move a
 * comment to a value the public filter ignores, effectively soft-hiding by
 * typo. Constrain to the documented values.
 */
export class UpdateCommentStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['visible', 'hidden', 'spam', 'deleted'])
  status: string;
}
