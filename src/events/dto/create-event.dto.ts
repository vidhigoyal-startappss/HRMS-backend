import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsOptional()
  @IsEnum(['birthday', 'anniversary'], {
    message: 'type must be one of the following values: birthday, anniversary',
  })
  type?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  user: string;
}
