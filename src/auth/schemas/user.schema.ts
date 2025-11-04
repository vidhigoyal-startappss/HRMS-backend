import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ _id: false })
class UserLeaves {
  @Prop({ default: 1 })
  wfhLeft: number;

  @Prop({ default: 1.5 })
  plLeft: number;
}

const UserLeavesSchema = SchemaFactory.createForClass(UserLeaves);

@Schema()
export class SalaryDetails {
  @Prop({ default: 0 })
  basicFixedMonthly: number;

  @Prop({ default: 0 })
  basicFixedYearly: number;

  @Prop({ default: 0 })
  hraFixedMonthly: number;

  @Prop({ default: 0 })
  hraFixedYearly: number;

  @Prop({ default: 0 })
  conveyanceMonthly: number;

  @Prop({ default: 0 })
  conveyanceYearly: number;

  @Prop({ default: 0 })
  dearnessAllowancesMonthly: number;

  @Prop({ default: 0 })
  dearnessAllowancesYearly: number;

  @Prop({ default: 0 })
  otherAllowancesMonthly: number;

  @Prop({ default: 0 })
  otherAllowancesYearly: number;

  @Prop({ default: 0 })
  annualGrossSalaryMonthly: number;

  @Prop({ default: 0 })
  annualGrossSalaryYearly: number;

  @Prop({ default: 0 })
  employerPFMonthly: number;

  @Prop({ default: 0 })
  employerPFYearly: number;

  @Prop({ default: 0 })
  totalFixedPayMonthly: number;

  @Prop({ default: 0 })
  totalFixedPayYearly: number;

  @Prop({ default: 0 })
  individualVariablePayMonthly: number;

  @Prop({ default: 0 })
  individualVariablePayYearly: number;

  @Prop({ default: 0 })
  totalCTCMonthly: number;

  @Prop({ default: 0 })
  totalCTCYearly: number;
}

export const SalaryDetailsSchema = SchemaFactory.createForClass(SalaryDetails);

@Schema()
export class Sequence {
  @Prop({ required: true, unique: true })
  collectionName: string;

  @Prop({ required: true })
  value: number;
}
export const SequenceSchema = SchemaFactory.createForClass(Sequence);

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: "Employee",
    enum: ["SuperAdmin", "Admin", "Manager", "HR", "Employee"],
  })
  role: string;

  @Prop({ unique: true, required: true })
  employeeId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  })
  createdBy: mongoose.Types.ObjectId | null;

  @Prop({
    type: Object,
    default: {},
  })
  customPermissions: Record<string, string[]>;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  dob: Date;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop()
  country: string;

  @Prop()
  joiningDate: Date;

  @Prop()
  designation: string;

  @Prop()
  department: string;

  @Prop()
  employmentType: string;

  @Prop()
  emergencyContactPersonName: string;

  @Prop()
  emergencyContactEmail: string;

  @Prop()
  currentAddress: string;

  @Prop()
  permanentAddress: string;

  @Prop()
  ctc: string;

  @Prop({ type: String, default: null })
  profileImage: string;

  @Prop()
  qualification: string;

  @Prop()
  institution: string;

  @Prop()
  yearOfPassing: number;

  @Prop()
  grade: string;

  @Prop()
  bankName: string;

  @Prop()
  accountNumber: string;

  @Prop()
  ifscCode: string;

  @Prop()
  adharNumber: string;

  @Prop()
  panNumber: string;

  @Prop()
  branchName: string;

  @Prop()
  accountHolderName: string;

  @Prop({ type: UserLeavesSchema, default: {} })
  leaves: UserLeaves;

  @Prop()
  resetOtp?: string;

  @Prop()
  resetOtpExpires?: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: SalaryDetailsSchema, default: {} })
  salaryDetails: SalaryDetails;
}

export const UserSchema = SchemaFactory.createForClass(User);
