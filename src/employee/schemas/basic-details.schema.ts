import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BasicDetails {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  dob: string;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipcode: string;

  @Prop()
  country: string;

  @Prop()
  joiningDate: string;

  @Prop()
  designation: string;

  @Prop()
  department: string;

  @Prop()
  employmentType: string;
}

export type BasicDetailsDocument = BasicDetails & Document;
export const BasicDetailsSchema = SchemaFactory.createForClass(BasicDetails);
