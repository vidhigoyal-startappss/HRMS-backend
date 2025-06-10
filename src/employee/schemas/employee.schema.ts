import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Schema as MongooseSchema } from "mongoose";
import { Document } from "mongoose";
import { Account, AccountSchema } from "./account.schema";
import { BasicDetails, BasicDetailsSchema } from "./basic-details.schema";
import {
  EducationDetails,
  EducationDetailsSchema,
} from "./education-details.schema";
import { BankDetails, BankDetailsSchema } from "./bank-details.schema";
@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ type: AccountSchema, required: true })
  account: Account;

  @Prop({ type: BasicDetailsSchema, required: true })
  basicDetails: BasicDetails;

  @Prop({ type: EducationDetailsSchema, required: true })
  educationDetails: EducationDetails;

  @Prop({ type: BankDetailsSchema, required: true })
  bankDetails: BankDetails;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
export type EmployeeDocument = Employee & Document;
