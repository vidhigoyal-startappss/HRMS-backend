import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AccountDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: 'admin' | 'hr' | 'employee';
}
