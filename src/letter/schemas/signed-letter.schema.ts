import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class SignedLetter {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  signedLetterUrl: string;

  @Prop({ type: Date, default: Date.now })
  uploadedAt: Date;
}

export type SignedLetterDocument = SignedLetter & Document;
export const SignedLetterSchema = SchemaFactory.createForClass(SignedLetter);
