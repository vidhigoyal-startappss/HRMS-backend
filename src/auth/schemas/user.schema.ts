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
  // Personal Details
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

  // @Prop()
  // CTC: string;

  @Prop({ type: String, default: null })
  profileImage: string;
  // Education
  @Prop()
  qualification: string;

  @Prop()
  institution: string;

  @Prop()
  yearOfPassing: number;

  @Prop()
  grade: string;

  // Bank Details
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
}

export const UserSchema = SchemaFactory.createForClass(User);
