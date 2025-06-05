import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EducationDetails {
  @Prop()
  highestQualification: string;

  @Prop()
  university: string;

  @Prop()
  yearOfPassing: string;

  @Prop()
  grade: string;
}

export type EducationDetailsDocument = EducationDetails & Document;
export const EducationDetailsSchema = SchemaFactory.createForClass(EducationDetails);
