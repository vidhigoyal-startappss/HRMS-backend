import { IsString } from 'class-validator';

export class BankDetailsDto {
  @IsString() bankName: string;
  @IsString() accountNumber: string;
  @IsString() ifscCode: string;
  @IsString() branchName: string;
  @IsString() accountHolderName: string;
  @IsString() aadharNumber: string;
  @IsString() panNumber: string;
}
