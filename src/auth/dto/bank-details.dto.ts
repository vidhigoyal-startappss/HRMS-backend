import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class BankDetailsDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  ifscCode: string;

  @IsString()
  @IsOptional()
  branchName: string;

  @IsString()
  @IsOptional()
  accountHolderName: string;
}
