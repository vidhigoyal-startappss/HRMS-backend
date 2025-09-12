import { IsEmail } from "class-validator";

export class CreateOnboardingDto {
  @IsEmail()
  email: string;
}
