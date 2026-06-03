import { IsDateString, IsOptional } from 'class-validator';

export class DailyStatsQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
