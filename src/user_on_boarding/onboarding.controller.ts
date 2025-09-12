import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { OnboardingService } from "./onboarding.service";
import { CreateOnboardingDto } from "./dto/create-onboarding.dto";
import { SubmitOnboardingDto } from "./dto/submit-onboarding.dto";

@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post("create")
  async createOnboardingForm(@Body() dto: CreateOnboardingDto) {
    return this.onboardingService.create(dto.email);
  }
  @Get("submitted")
  async getSubmittedForms() {
    return this.onboardingService.getSubmittedForms();
  }
  @Get(":token")
  async getForm(@Param("token") token: string) {
    const form = await this.onboardingService.getByToken(token);
    if (!form) throw new NotFoundException("Invalid or expired link");
    return form;
  }

  @Post(":token/submit")
  async submitForm(
    @Param("token") token: string,
    @Body() body: SubmitOnboardingDto
  ) {
    return this.onboardingService.submit(token, body);
  }
}
