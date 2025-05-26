import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class BasicDetailsDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  zipCode: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsDateString()
  @IsOptional()
  joiningDate: Date;

  @IsString()
  @IsOptional()
  designation: string;

  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @IsOptional()
  employmentType: string;
}
