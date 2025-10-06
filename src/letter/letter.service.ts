import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"; 
import { Model } from "mongoose"; 

import { SignedLetter, SignedLetterDocument } from "./schemas/signed-letter.schema"; 

@Injectable()
export class LetterService {
  constructor(
    @InjectModel(SignedLetter.name)
    private model: Model<SignedLetterDocument>
  ) {}

  async saveSignedLetter(userId: string, url: string) {
    const existing = await this.model.findOne({ employeeId: userId });

    if (existing) {
      existing.signedLetterUrl = url;
      existing.uploadedAt = new Date();
      return await existing.save();
    }

    return await this.model.create({ employeeId: userId, signedLetterUrl: url });
  }

  async getSignedLetterUrl(userId: string): Promise<string | null> {
    const record = await this.model.findOne({ employeeId: userId });
    return record?.signedLetterUrl || null;
  }
}