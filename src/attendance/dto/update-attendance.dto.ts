import { IsString, IsDateString, IsIn, IsOptional } from 'class-validator';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsIn(['Present', 'Absent', 'Late'])
  status?: 'Present' | 'Absent' | 'Late';
}
