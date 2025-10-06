import { IsString } from 'class-validator';

export class UploadSignedDto {
  @IsString()
  employeeId: string;

  @IsString()
  signedLetterUrl: string; 
}