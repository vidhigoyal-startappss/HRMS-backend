import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LetterController } from "./letter.controller";
import { LetterService } from "./letter.service";
import { SignedLetter, SignedLetterSchema } from "./schemas/signed-letter.schema";
import { EmailModule } from "../mail/mail.module";

@Module({
  imports: [
    EmailModule, 
    MongooseModule.forFeature([
      { name: SignedLetter.name, schema: SignedLetterSchema } 
    ])
  ],
  controllers: [LetterController],
  providers: [LetterService],
  exports: [LetterService],
})
export class LetterModule {}





