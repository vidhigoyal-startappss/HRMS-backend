import { IsString, IsNumber } from 'class-validator';

export class EducationDetailsDto {
  @IsString() qualification: string;
  @IsString() institution: string;
  @IsNumber() yearOfPassing: number;
  @IsString() grade: string;
}
