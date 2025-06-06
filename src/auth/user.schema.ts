import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ collection: "users" }) // existing collection
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: "SuperAdmin" }) // optional role
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
