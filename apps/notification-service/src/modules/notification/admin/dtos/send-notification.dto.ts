import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendNotificationDto {
  @IsArray()
  @IsString({ each: true })
  user_ids: string[];

  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  data?: any;
}
