import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: string; // Format: YYYY-MM-DD

  @Prop({ required: true, enum: ['Present', 'Absent', 'Late'] })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
