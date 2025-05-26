import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsIn,
  MinLength,
  IsOptional,
  IsObject,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Admin', 'Manager', 'HR', 'Employee'], {
    message: 'Role must be Admin, Manager, HR, or Employee',
  })
  role: string;

  @IsOptional()
  @IsObject({ message: 'Custom permissions must be an object' })
  customPermissions?: Record<string, string[]>;
}