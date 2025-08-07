import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BankDetailsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty( {description:"Bank Name is required",example:"sbi"})
  bankName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty( {description:"Bank Name is required",example:"sbi"})
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty( {description:"Bank Name is required",example:"sbi"})

  ifscCode: string;

  @IsString()
  @IsOptional()
  @ApiProperty( {description:"Bank Name is required",example:"sbi"})

  branchName: string;

  @IsString()
  @IsOptional()
  @ApiProperty( {description:"Bank Name is required",example:"sbi"})

  accountHolderName: string;

  @IsString()
  @IsOptional()
  @ApiProperty( {description:"Bank Name is required",example:"sbi"})

  adharNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty( {description:"Bank Name is required",example:"sbi"})

  panNumber: string;
}
