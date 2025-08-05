import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema({ timestamps: true })
export class Leave {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ required: true })
  reason: string;

  @Prop({
    default: 'fullday',
    enum: ['fullday', 'halfday'],
  })
  dayType: string;

  @Prop({
    default: 'casual',
   enum: ['sick', 'casual', 'work'], 
  })
  leaveType: string;

  @Prop()
  noOfDays: number;

  @Prop()
  paidDays: number;

  @Prop()
  unpaidDays: number;

  @Prop({ default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  approvedBy: mongoose.Types.ObjectId;
}

export type LeaveDocument = Leave & Document;
export const LeaveSchema = SchemaFactory.createForClass(Leave);
