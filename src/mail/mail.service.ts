import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendUserCredentials(email: string, password: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome! Your Account Details",
      text: `Your account has been created. Your password is: ${password}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async sendResetLinkToEmail(email: string, resetLink: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password Link",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
    });
  }

  async sendOnboardingLink(email: string, token: string) {
    const formLink = `http://localhost:3001/onboarding/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Complete Your Onboarding Form",
      html: `
      <p>Hi!</p>
      <p>Please complete your onboarding form by clicking <a href="${formLink}">here</a>.</p>
    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Onboarding email sent successfully");
    } catch (error) {
      console.error("Error sending onboarding email:", error);
    }
  }

  async sendAppointmentLetter(email: string, pdfUrl: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Appointment Letter",
      html: `
      <p>Hello,</p>
      <p>Please <a href="${pdfUrl}">click here</a> to view and sign your appointment letter.</p>
      <p>Thanks!</p>
    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Appointment letter sent successfully");
    } catch (error) {
      console.error("Error sending appointment letter email:", error);
      throw error;
    }
  }
}
