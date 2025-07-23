import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ enum: ['birthday', 'anniversary'], required: false })
  type: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  dob: Date;

  @Prop()
  joiningDate: Date;

  @Prop()
  profileImage: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
