import { IsNotEmpty, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @IsMongoId()
  recipient: string | Types.ObjectId;
  @IsNotEmpty()
  title: string;

  message?: string;
  type?: string;
  relatedModule?: string;
}
