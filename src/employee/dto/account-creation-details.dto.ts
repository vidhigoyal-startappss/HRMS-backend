import { IsString, IsOptional } from 'class-validator';

export class AccountCreationDetailsDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsString() phone: string;
  @IsOptional() @IsString() dob?: string;
  @IsString() gender: string;
  @IsString() address: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsString() zipCode: string;
  @IsString() country: string;
  @IsOptional() @IsString() joiningDate?: string;
  @IsOptional() @IsString() designation?: string;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @IsString() employmentType?: string;
}
