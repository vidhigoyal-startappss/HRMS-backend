import { IsEmail, IsString, MinLength, ValidateNested, IsIn, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { EmployeeDetailsDto } from './employee-details.dto';

export class CreateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['admin', 'hr', 'employee'])
  role?: string;

  @ValidateNested()
  @Type(() => EmployeeDetailsDto)
  employeeDetails: EmployeeDetailsDto;
}
