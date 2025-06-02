import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ _id: false })
export class AccountCreationDetails {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  dob?: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  joiningDate?: string;

  @Prop()
  designation?: string;

  @Prop()
  department?: string;

  @Prop()
  employmentType?: string;
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
  @Prop({ required: true })
  qualification: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  yearOfPassing: number;

  @Prop({ required: true })
  grade: string;
}

export const EducationDetailsSchema = SchemaFactory.createForClass(EducationDetails);

@Schema({ collection: 'employeeDetails' })
export class Employee {
  @Prop({ required: true, unique: true }) email: string;

  @Prop({ required: true }) password: string;

  @Prop({ required: true }) role: string;

  // Nest the 3 objects under employeeDetails key:
  @Prop({
    type: {
      accountCreationDetails: AccountCreationDetailsSchema,
      bankDetails: BankDetailsSchema,
      educationDetails: EducationDetailsSchema,
    },
    required: true,
  })
  employeeDetails: {
    accountCreationDetails: AccountCreationDetails;
    bankDetails: BankDetails;
    educationDetails: EducationDetails;
  };
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
