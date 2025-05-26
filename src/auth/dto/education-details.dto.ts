import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';


export class EducationDetailsDto {
  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsNotEmpty()
  yearOfPassing: number;

  @IsString()
  @IsNotEmpty()
  grade: string;
}

