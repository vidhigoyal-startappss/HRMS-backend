import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  OnboardingForm,
  OnboardingFormDocument,
} from "./schemas/onboarding-form.schema";
const { v4: uuidv4 } = require('uuid');
import { EmailService } from "../mail/mail.service";
@Injectable()
export class OnboardingService {
  constructor(
    @InjectModel(OnboardingForm.name)
    private formModel: Model<OnboardingFormDocument>,
    private emailService: EmailService
  ) {}
  async create(email: string) {
    const token = uuidv4();

    const existing = await this.formModel.findOne({
      email,
      isSubmitted: false,
    });
    if (existing) return existing;

    const form = new this.formModel({ email, token });
    await form.save();

    const formLink = `http://localhost:3001/onboarding/${token}`;

    try {
      await this.emailService.sendOnboardingLink(email, token);
      console.log("Onboarding email sent successfully");
    } catch (error) {
      console.error("Error sending onboarding email:", error);
    }

    return {
      message: "Onboarding form created",
      formLink: `http://localhost:3001/onboarding/${token}`,
      formData: form,
    };
  }

  async getByToken(token: string) {
    return this.formModel.findOne({ token });
  }

  async submit(token: string, data: any) {
    return this.formModel.findOneAndUpdate(
      { token },
      {
        ...data,
        isSubmitted: true,
        submittedAt: new Date(),
      },
      { new: true }
    );
  }

  async getSubmittedForms() {
    return this.formModel
      .find({ isSubmitted: true })
      .sort({ submittedAt: -1 })
      .lean();
  }
}
