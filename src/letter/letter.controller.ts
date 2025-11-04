import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { EmailService } from "../mail/mail.service";
import { LetterService } from "./letter.service";
import { uploadPdfToCloudinary } from "../common/utils/uploadPdfToCloudinary";
import { Request } from "express";
import { toWords } from "number-to-words";
import * as pdf from "html-pdf-node";
import { Req } from "@nestjs/common";
import * as multer from "multer";

@Controller("letters")
export class LetterController {
  constructor(
    private readonly emailService: EmailService,
    private readonly letterService: LetterService
  ) {}

  private getTempDir(subfolder: string) {
    const dir = path.join("/tmp", subfolder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join("/tmp", "letters");
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, `appointment-${unique}${ext}`);
        },
      }),
    })
  )
  async uploadAndSendLetter(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request
  ) {
    const { email, userId } = body;

    if (!file) throw new BadRequestException("No file uploaded");
    if (!userId) throw new BadRequestException("User ID missing");

    const filename = file.filename;
    const publicUrl = `https://hrms1-kappa.vercel.app/sign-letter/${userId}/${filename}`;
    await this.emailService.sendAppointmentLetter(email, publicUrl);
    return { message: "Letter uploaded and email sent", link: publicUrl };
  }

  @Post("signed-upload")
  @UseInterceptors(FileInterceptor("file", { storage: multer.memoryStorage() }))
  async uploadSignedLetter(
    @UploadedFile() file: Express.Multer.File,
    @Body("userId") userId: string
  ) {
    if (!file) throw new BadRequestException("No file uploaded");

    const url = await uploadPdfToCloudinary(file.buffer, "signed-pdfs");
    await this.letterService.saveSignedLetter(userId, url);

    return { message: "Signed letter uploaded successfully", link: url };
  }

  @Get("signed/:userId")
  async getSignedLetter(@Param("userId") userId: string) {
    const url = await this.letterService.getSignedLetterUrl(userId);
    if (!url) throw new NotFoundException("No signed letter found");
    return { link: url };
  }

  @Post("generate")
  async generateLetter(@Body() body: any) {
    try {
      const {
        firstName,
        lastName,
        designation,
        joiningDate,
        ctc,
        phoneNumber,
        salaryDetails,
      } = body;
      const formattedJoiningDate = new Date(joiningDate).toLocaleDateString(
        "en-GB"
      );
      const fullName = `${firstName} ${lastName}`;
      const htmlTemplatePath = path.resolve(
        process.cwd(),
        "src/templates/appointmentletter.html"
      );

      if (!fs.existsSync(htmlTemplatePath)) {
        throw new Error(`Template file not found at ${htmlTemplatePath}`);
      }

      const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");
    const numericCtc = Number(ctc?.toString().replace(/,/g, ""));
if (!isFinite(numericCtc)) {
  throw new BadRequestException("CTC must be a valid number");
}

      const ctcInWords = toWords(numericCtc).replace(/^\w/, (c) =>
        c.toUpperCase()
      );
      const today = new Date();
      const formattedDate = today
        .toLocaleDateString("en-GB")
        .replace(/\//g, "/");

      let filledHtml = htmlTemplate
        .replace(/{{fullName}}/g, fullName)
        .replace(/{{designation}}/g, designation)
        .replace(/{{joiningDate}}/g, formattedJoiningDate)
        .replace(/{{ctc}}/g, ctc.toString())
        .replace(/{{ctcInWords}}/g, `${ctcInWords} Rupees` || "Zero Rupees")
        .replace(/{{phoneNumber}}/g, phoneNumber || "N/A")
        .replace(/{{currentDate}}/g, formattedDate);

      const fields: { name: keyof typeof salaryDetails; label: string }[] = [
        { name: "basicFixedMonthly", label: "Basic Fixed Monthly" },
        { name: "basicFixedYearly", label: "Basic Fixed Yearly" },
        { name: "hraFixedMonthly", label: "HRA Fixed Monthly" },
        { name: "hraFixedYearly", label: "HRA Fixed Yearly" },
        { name: "conveyanceMonthly", label: "Conveyance Monthly" },
        { name: "conveyanceYearly", label: "Conveyance Yearly" },
        {
          name: "dearnessAllowancesMonthly",
          label: "Dearness Allowance Monthly",
        },
        {
          name: "dearnessAllowancesYearly",
          label: "Dearness Allowance Yearly",
        },
        { name: "otherAllowancesMonthly", label: "Other Allowances Monthly" },
        { name: "otherAllowancesYearly", label: "Other Allowances Yearly" },
        {
          name: "annualGrossSalaryMonthly",
          label: "Annual Gross Salary Monthly",
        },
        {
          name: "annualGrossSalaryYearly",
          label: "Annual Gross Salary Yearly",
        },
        { name: "employerPFMonthly", label: "Employer PF Monthly" },
        { name: "employerPFYearly", label: "Employer PF Yearly" },
        { name: "totalFixedPayMonthly", label: "Total Fixed Pay Monthly" },
        { name: "totalFixedPayYearly", label: "Total Fixed Pay Yearly" },
        {
          name: "individualVariablePayMonthly",
          label: "Individual Variable Pay Monthly",
        },
        {
          name: "individualVariablePayYearly",
          label: "Individual Variable Pay Yearly",
        },
        { name: "totalCTCMonthly", label: "Total CTC Monthly" },
        { name: "totalCTCYearly", label: "Total CTC Yearly" },
      ];

      fields.forEach((field) => {
        const placeholder = `{{${String(field.name)}}}`;
        const value = salaryDetails[field.name] || "0,00,000.00";
        filledHtml = filledHtml.replace(new RegExp(placeholder, "g"), value);
      });

      const file = { content: filledHtml };
      const options = { format: "A4" };

      const pdfBuffer = await pdf.generatePdf(file, options);

      const pdfUrl = await uploadPdfToCloudinary(pdfBuffer, "letters");

      return { link: pdfUrl };
    } catch (error) {
      console.error("Error generating letter:", error);
      throw error;
    }
  }
}
