import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'Employee', enum: ['Admin', 'Manager', 'HR', 'Employee'] })
  role: string;

  @Prop({
    type: Object,
    default: {}, // Example: { users: ['read'], leaves: ['read', 'write'] }
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
  branchName: string;

  @Prop()
  accountHolderName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
