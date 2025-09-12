import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OnboardingController } from "./onboarding.controller";
import { OnboardingService } from "./onboarding.service";
import { OnboardingForm, OnboardingFormSchema } from "./schemas/onboarding-form.schema";
import { EmailModule } from '../mail/mail.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OnboardingForm.name, schema: OnboardingFormSchema },
    ]),
    EmailModule,
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
