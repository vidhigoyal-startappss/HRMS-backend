import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Payroll {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop({ required: true })
  month: string; // Format: YYYY-MM

  @Prop({ required: true })
  basicSalary: number;

  @Prop({ required: true })
  allowances: number;

  @Prop({ required: true })
  deductions: number;

  @Prop({ required: true })
  netPay: number;
}

export type PayrollDocument = Payroll & Document;
export const PayrollSchema = SchemaFactory.createForClass(Payroll);
