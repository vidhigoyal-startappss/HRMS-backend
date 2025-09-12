import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { required } from "joi";
import mongoose, { Document } from "mongoose";

export type OnboardingFormDocument = OnboardingForm & Document;

@Schema({ timestamps: true })
export class OnboardingForm {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Object, default: {} })
  basicDetails: Record<string, any>;

  @Prop({ type: Object, default: {} })
  educationDetails: Record<string, any>;

  @Prop({ type: Object, default: {} })
  bankDetails: Record<string, any>;

  @Prop({ default: false })
  isSubmitted: boolean;

  @Prop({ default: false })
  isProcessed: boolean;

  @Prop()
  submittedAt?: Date;
}
export const OnboardingFormSchema =  SchemaFactory.createForClass(OnboardingForm);
