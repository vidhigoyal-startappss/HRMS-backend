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
  @ApiProperty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()

  ifscCode: string;

  @IsString()
  @IsOptional()
  @ApiProperty()

  branchName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()

  accountHolderName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()

  adharNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()

  panNumber: string;
}
