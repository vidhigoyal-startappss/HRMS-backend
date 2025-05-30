import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ _id: false }) // No separate _id for embedded docs
export class AccountCreationDetails {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) dob: string;
  @Prop({ required: true }) gender: string;
  @Prop() phone?: string;
  @Prop() address?: string;
  @Prop() employeeId?: string;
  @Prop() joiningDate?: string;
}
export const AccountCreationDetailsSchema = SchemaFactory.createForClass(AccountCreationDetails);

@Schema({ _id: false })
export class BankDetails {
  @Prop({ required: true }) bankName: string;
  @Prop({ required: true }) accountNumber: string;
  @Prop({ required: true }) ifscCode: string;
  @Prop({ required: true }) branchName: string;
  @Prop({ required: true }) accountHolderName: string;
  @Prop({ required: true }) aadharNumber: string;
  @Prop({ required: true }) panNumber: string;
}
export const BankDetailsSchema = SchemaFactory.createForClass(BankDetails);

@Schema({ _id: false })
export class EducationDetails {
  @Prop({ required: true }) qualification: string;
  @Prop({ required: true }) institution: string;
  @Prop({ required: true }) yearOfPassing: number;
  @Prop({ required: true }) grade: string;
}
export const EducationDetailsSchema = SchemaFactory.createForClass(EducationDetails);

@Schema()
export class User {
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true }) role: string;

  @Prop({ type: AccountCreationDetailsSchema }) accountCreationDetails: AccountCreationDetails;
  @Prop({ type: BankDetailsSchema }) bankDetails: BankDetails;
  @Prop({ type: EducationDetailsSchema }) educationDetails: EducationDetails;
}

export const UserSchema = SchemaFactory.createForClass(User);
