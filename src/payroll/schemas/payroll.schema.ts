import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class MonthlyPayroll {
  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  payrollSlipUrl: string;
}

@Schema({ timestamps: true })
export class Payroll {
  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop({ type: [MonthlyPayroll], default: [] })
  payrolls: MonthlyPayroll[];
}

export type PayrollDocument = Payroll & Document;
export const PayrollSchema = SchemaFactory.createForClass(Payroll);
