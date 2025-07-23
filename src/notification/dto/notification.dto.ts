import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateNotificationDto {
  @IsMongoId()
  recipient: string;

  @IsNotEmpty()
  title: string;

  message?: string;
  type?: string;
  relatedModule?: string;
}
