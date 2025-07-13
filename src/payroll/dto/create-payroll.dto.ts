import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreatePayrollDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  basicSalary: number;

  @IsNotEmpty()
  @IsNumber()
  allowances: number;

  @IsNotEmpty()
  @IsNumber()
  deductions: number;

  @IsNotEmpty()
  @IsNumber()
  netPay: number;
}
