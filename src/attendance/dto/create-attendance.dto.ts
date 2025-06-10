import { IsString, IsDateString, IsIn } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsDateString()
  date: string;

  @IsIn(['Present', 'Absent', 'Late'])
  status: 'Present' | 'Absent' | 'Late';
}
