import { IsObject, IsOptional } from 'class-validator';

export class SubmitOnboardingDto {
  @IsObject()
  @IsOptional()
  basicDetails: Record<string, any>;

  @IsObject()
  @IsOptional()
  educationDetails: Record<string, any>;

  @IsObject()
  @IsOptional()
  bankDetails: Record<string, any>;
}
