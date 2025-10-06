import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePayrollDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  month: string;
}
