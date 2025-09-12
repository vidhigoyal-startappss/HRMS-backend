import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import * as multer from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { EmailService } from "../mail/mail.service";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { LetterService } from "./letter.service";
import { uploadPdfToCloudinary } from "../common/utils/uploadPdfToCloudinary";

@Controller("letters")
export class LetterController {
  constructor(
    private readonly emailService: EmailService,
    private readonly letterService: LetterService
  ) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/letters",
        filename: (req, file, cb) => {
          const fileExtName = path.extname(file.originalname);
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, `appointment-${uniqueSuffix}${fileExtName}`);
        },
      }),
    })
  )
  async uploadAndSendLetter(
    @UploadedFile() file: Express.Multer.File,
    @Body("email") email: string
  ) {
    if (!file) {
      throw new Error("No file uploaded");
    }

    // const publicUrl = `http://localhost:3000/uploads/letters/${file.filename}`;
    const publicUrl = `http://localhost:3001/sign-letter/${file.filename}`;

    await this.emailService.sendAppointmentLetter(email, publicUrl);

    return {
      message: "Letter uploaded and email sent",
      link: publicUrl,
    };
  }

  @Post("signed-upload")
  @UseInterceptors(FileInterceptor("file", { storage: multer.memoryStorage() }))
  async uploadSignedLetter(
    @UploadedFile() file: Express.Multer.File,
    @Body("userId") userId: string
  ) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    try {
      const url = await uploadPdfToCloudinary(file.buffer, "signed-pdfs");
      await this.letterService.saveSignedLetter(userId, url);
      console.log("Saved signed letter for userId:", userId, "URL:", url);

      return {
        message: "Signed letter uploaded successfully",
        link: url,
      };
    } catch (err) {
      console.error("Error uploading signed PDF:", err);
      throw new InternalServerErrorException(
        "Failed to upload signed PDF. Check server logs."
      );
    }
  }

  @Get("signed/:userId")
  async getSignedLetter(@Param("userId") userId: string) {
    const url = await this.letterService.getSignedLetterUrl(userId);
    console.log("GET signed letter for userId:", userId, "URL:", url);
    if (!url) throw new NotFoundException("No signed letter found");
    return { link: url };
  }
}
