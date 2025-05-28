// src/auth/dto/signup.dto.ts
import { IsEmail, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @IsIn(['superAdmin', 'hr', 'employee'])
  role?: string;
}
