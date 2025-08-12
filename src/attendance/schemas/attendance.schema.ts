import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; 
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  role: string;

  @Prop({ required: true })
  checkInTime: Date;

  @Prop()
  checkOutTime: Date;

  @Prop()
  totalHours: string; 
  @Prop()
  location: string;

  @Prop({ default: false })
  checkedOut: boolean;

  @Prop({ default: false })
  leave: boolean; 
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
