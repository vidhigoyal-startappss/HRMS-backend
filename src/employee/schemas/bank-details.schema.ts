import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BankDetails {
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

  @Prop()
  aadharNumber: string;

  @Prop()
  panNumber: string;
}

export type BankDetailsDocument = BankDetails & Document;
export const BankDetailsSchema = SchemaFactory.createForClass(BankDetails);
