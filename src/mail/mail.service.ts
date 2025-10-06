// import { Injectable } from "@nestjs/common";
// import * as nodemailer from "nodemailer";
// import { configDotenv } from "dotenv";

// @Injectable()
// export class EmailService {
//   private transporter;

//   constructor() {
//     console.log("EMAIL_USER:", process.env.EMAIL_USER);
//     this.transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // or true if using SSL/TLS
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

//   async sendUserCredentials(email: string, password: string) {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Welcome! Your Account Details",
//       text: `Your account has been created. Your password is: ${password}`,
//     };

//     try {
//       await this.transporter.sendMail(mailOptions);
//       console.log("Email sent successfully");
//     } catch (error) {
//       console.error("Error sending email:", error);
//     }
//   }

//   async sendResetLinkToEmail(email: string, resetLink: string) {
//     await this.transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Reset Password Link",
//       html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
//     });
//   }

//   async sendOnboardingLink(email: string, token: string) {
//     const formLink = `http://localhost:3001/onboarding/${token}`;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Complete Your Onboarding Form",
//       html: `
//       <p>Hi!</p>
//       <p>Please complete your onboarding form by clicking <a href="${formLink}">here</a>.</p>
//     `,
//     };

//     try {
//       await this.transporter.sendMail(mailOptions);
//       console.log("Onboarding email sent successfully");
//     } catch (error) {
//       console.error("Error sending onboarding email:", error);
//     }
//   }

//   async sendAppointmentLetter(email: string, pdfUrl: string) {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your Appointment Letter",
//       html: `
//       <p>Hello,</p>
//       <p>Please <a href="${pdfUrl}">click here</a> to view and sign your appointment letter.</p>
//       <p>Thanks!</p>
//     `,
//     };

//     try {
//       await this.transporter.sendMail(mailOptions);
//       console.log("Appointment letter sent successfully");
//     } catch (error) {
//       console.error("Error sending appointment letter email:", error);
//       throw error;
//     }
//   }
// }

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
      secure: false, // or true if using SSL/TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendUserCredentials(email: string, password: string) {
    const mailOptions = {
      from: `"Startappss HR Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Startappss HRMS – Your Login Credentials",
      html: `
     


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Appointment Letter</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #eaf7f3; 
      color: #333;
    }

    .container {
      max-width: 1200px;
      width: 100%;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    /* Header Image Full Width */
    .letter-header {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .logo {
      width: 100%; 
      height: auto;
      display: block;
    }

    /* Content Styles */
    .letter-content {
      padding: 30px 40px;
      background-color: #ffffff;
      color: #333;
      line-height: 1.6;
    }

    .letter-content p {
      margin: 12px 0;
    }

    .footer {
      background-color: #f4f7f9;
      padding: 20px;
      text-align: center;
      color: #888888;
      font-size: 14px;
    }

    /* Animation for the header title */
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>

  <div class="container">
    <!-- Full-width Header with Image -->
    <header class="letter-header">
      <img src="https://i.postimg.cc/B6gn2XcY/photo-2025-09-17-12-47-14.jpg" alt="Company Logo" class="logo">
    </header>

    <!-- Content Section -->
    <div class="letter-content">
          <p style="font-size: 18px; margin-bottom: 15px;">Dear <strong>Employee</strong>,</p>
      <p style="font-size: 16px; margin-bottom: 20px;">
        Welcome to <strong>Startappss System India Pvt.</strong> Ltd. We're thrilled to have you onboard! Your <strong>HRMS</strong> (Human Resource Management System) account is now ready to use. This system will be your one-stop platform for managing attendance, leave requests, payroll, and internal communication. Get ready to streamline your experience!
      </p>

      <p style="font-size: 20px; color: #333; font-weight: 300; margin-bottom: 15px;">Your login credentials are as follows:</p>
      <ul style="font-size: 16px; line-height: 1.7; list-style-type: disc; padding-left: 20px; color: #333; margin-bottom: 25px;">
        <li style="margin-bottom: 10px;"><strong>Login ID / Email:</strong> <span style="color: #333;">${email}</span></li>
        <li style="margin-bottom: 10px;"><strong>Temporary Password:</strong> <span style="color: #333;">${password}</span></li>
        <li style="margin-bottom: 10px;">
          <strong>Portal Link:</strong> 
          <a href="https://hrms-startapps-3gm5.vercel.app/" target="_blank" style="color: #333; text-decoration: none; font-weight: 600; transition: color 0.3s ease-in-out; border-bottom: 2px solid #2196F3;"> Click here to login </a>
        </li>
      </ul>

      <h3 style="font-size: 20px;  color: #333; font-weight: 300; margin-bottom: 15px;">Next Steps:</h3>
      <ol style="font-size: 16px; padding-left: 1px; list-style-type: none; margin-bottom: 25px; color: #333;">
        <li style="margin-bottom: 10px;">1) Log in using the credentials provided above.</li>
        <li style="margin-bottom: 10px;">2) Immediately reset your password after your first login for security purposes.</li>
        <li style="margin-bottom: 10px;">3) Update your profile and upload any pending documents to complete your setup.</li>
      </ol>

      <p style="font-size: 16px; color: #E53E3E; font-weight: 600; margin-bottom: 6px;">Important:</p>
      <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
        For your security, please keep your login credentials confidential. This account is linked to your personal and employee records. Do not share your credentials with anyone.
      </p>

      <p style="font-size: 16px; line-height: 1.5; color: #333; margin-bottom: 6px;">
        For technical or login assistance, feel free to contact us at <a href="mailto:hr@startappss.com" style="color: #333;">hr@startappss.com</a> or reach out to the HR department directly.
      </p>

    <div style="font-size: 16px; line-height: 1.7; color: #333;">
  <p>We are excited to have you as part of our team, and we look forward to your success at Startappss!</p>
  

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Thanks & Regards</strong>
  </div>

  <!-- HR Management Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>HR Management</strong>
  </div>

  <!-- Company Name Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Startappss Systems India Pvt Ltd</strong>
  </div>

  <!-- Location Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Indore, Noida M.P. , India</strong>
  </div>

  <!-- Contact Information Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Email:</strong> <a href="mailto:hr@startappss.com" style="color: #333; font-weight: bold;">hr@startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Website:</strong> <a href="https://startappss.com" style="color: #333; font-weight: bold;">https://startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Mobile No:</strong> <span style="color: #333; font-weight: bold;">9238920590</span>
  </div>
</div>


     
      </div>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>&copy; 2025 Startappss System India Pvt. Ltd. All rights reserved.</p>
    </div>
  </div>
<script>
  // Assuming the email is stored in a variable
  const email = "riya.kushwah@startappss.com";
  
  // Extract the name part before the '@'
  const userName = email.split('@')[0];

  // Display the name in the HTML
  document.getElementById('user-name').textContent = userName;
</script>
</body>
</html>


    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Styled email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async sendResetLinkToEmail(email: string, resetLink: string) {
    const mailOptions = {
      from: `"Startappss HR Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "HRMS – Password Reset Instructions",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HRMS Password Reset</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #eaf7f3; 
      color: #333;
    }

    .container {
      max-width: 1200px;
      width: 100%;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    /* Header Image Full Width */
    .letter-header {
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .logo {
      width: 100%; 
      height: auto;
      display: block;
    }

    /* Content Styles */
    .letter-content {
      padding: 30px 40px;
      background-color: #ffffff;
      color: #333;
      line-height: 1.6;
    }

    .letter-content p {
      margin: 12px 0;
    }

    .footer {
      background-color: #f4f7f9;
      padding: 20px;
      text-align: center;
      color: #888888;
      font-size: 14px;
    }

    /* Animation for the header title */
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Image -->
    <header class="letter-header">
      <img src="https://i.postimg.cc/B6gn2XcY/photo-2025-09-17-12-47-14.jpg" alt="Company Logo" class="logo">
    </header>

    <!-- Content Section -->
    <div class="letter-content">
      <p style="font-size: 18px;">Dear <strong>Employee</strong>,</p>

      <p>
        We have received a request to reset your <strong>HRMS</strong> account password. To ensure uninterrupted access to the portal, please follow the instructions below.
      </p>

      <p>
        <strong>Click the secure link below to create a new password:</strong><br>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
      </p>

      <h3 style="margin-top: 24px;">Guidelines for Creating a Strong Password:</h3>
      <ul>
        <li>Must be 8–12 characters long</li>
        <li>Include uppercase and lowercase letters</li>
        <li>Contain at least one number and one special character</li>
        <li>Avoid using personal details like name, birthdate, or employee ID</li>
      </ul>

      <p style="color: #E53E3E; font-weight: bold;">Important:</p>
      <p>
        This reset link will remain active for <strong>15 Minute</strong> only. If not used within this period, you will need to initiate a new reset request.
      </p>

      <p>
        If you did not request this password reset, kindly ignore this email and immediately report the activity to our HR team at 
        <a href="mailto:hr@startappss.com">hr@startappss.com</a>.
      </p>

      <p>
        Maintaining the confidentiality of your HRMS account is essential. It contains sensitive personal and professional information, such as payslips, tax documents, and leave records.
      </p>

      <p>Thank you for your prompt attention.</p>

      <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Thanks & Regards</strong>
  </div>

  <!-- HR Management Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>HR Management</strong>
  </div>

  <!-- Company Name Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Startappss Systems India Pvt Ltd</strong>
  </div>

  <!-- Location Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Indore, Noida M.P. , India</strong>
  </div>

  <!-- Contact Information Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Email:</strong> <a href="mailto:hr@startappss.com" style="color: #333; font-weight: bold;">hr@startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Website:</strong> <a href="https://startappss.com" style="color: #333; font-weight: bold;">https://startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Mobile No:</strong> <span style="color: #333; font-weight: bold;">9238920590</span>
  </div>
</div>


    <!-- Footer -->
    <div class="footer">
      &copy; 2025 Startappss Systems India Pvt. Ltd. All rights reserved.
    </div>
  </div>
</body>
</html>
    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  }

  async sendOnboardingLink(email: string, token: string) {
    const formLink = `http://localhost:3001/onboarding/${token}`;

    const mailOptions = {
      from: `"Startappss HR Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Complete Your Onboarding Process – Action Required",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Onboarding Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f7f9;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
    }
    .container {
      max-width: 1200px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }
    .header {
        position: relative;
        width: 100%;
    }
    .header-banner{
      width: 100%;
      height: auto;
      display: block;
    }
    .header-logo{
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 2;
    }
    .header-logo img{
        height: 250px;
        width: auto;
    }
    .content {
      padding: 2px 40px;
      background-color: #ffffff;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .content a.button {
      display: inline-block;
      padding: 10px 18px;
      background-color: #113F67;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 10px;
      font-weight: bold;
    }
    .footer {
      background-color: #f0f0f0;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
        <img src="https://i.postimg.cc/9MKxRL4k/photo-2025-09-17-12-47-14.jpg" alt="header-banner" class="header-banner">
       
    </div>

    <!-- Main Content -->
    <div class="content">
      <p>Dear <strong>Employee</strong>,</p>

      <p>
        We are pleased to welcome you to <strong>Startappss System India Pvt. Ltd.</strong> As part of your joining formalities, you are requested to complete your onboarding process through the HRMS portal.
      </p>

      <p>
        Please use the link below to start your onboarding process:
      </p>

      <p>
        <a href="${formLink}" class="button" target="_blank">Complete Onboarding Form</a>
      </p>

      <h3 style="margin-top: 24px;">Steps to Complete Onboarding:</h3>
      <ul style="padding-left: 20px; line-height: 1.8;">
        <li>Log in using your credentials (shared earlier).</li>
        <li>Fill in your personal details such as address, contact number, emergency contact, etc.</li>
        <li>Upload all required documents.</li>
        <li>Review and confirm all details before submitting.</li>
      </ul>

      <p style="color: #E53E3E; font-weight: bold;">
        Important Note:
      </p>
      <p>
        Please complete the onboarding process within <strong>3 working days</strong> to avoid any delays in payroll processing, system access, or allocation of projects.
      </p>

      <p>
        If you face any difficulties while filling the form or uploading documents, kindly contact the HR team at 
        <a href="mailto:hr@startappss.com">hr@startappss.com</a> or visit the HR desk for assistance.
      </p>

      <p>
        We are excited to start this journey with you and look forward to building a successful career together.
      </p>

      <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Thanks & Regards</strong>
  </div>

  <!-- HR Management Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>HR Management</strong>
  </div>

  <!-- Company Name Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Startappss Systems India Pvt Ltd</strong>
  </div>

  <!-- Location Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Indore, Noida M.P. , India</strong>
  </div>

  <!-- Contact Information Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Email:</strong> <a href="mailto:hr@startappss.com" style="color: #333; font-weight: bold;">hr@startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Website:</strong> <a href="https://startappss.com" style="color: #333; font-weight: bold;">https://startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Mobile No:</strong> <a href="tel:+919238920590" style="color: #333; font-weight: bold;">+91-9238920590</span>
  </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      &copy; 2025 Startappss System India Pvt. Ltd. All rights reserved.
    </div>
  </div>
</body>
</html>
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
      subject: "Appointment Letter – Startappss System India Pvt. Ltd.",
      html: `
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Appointment Letter</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f7f9;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
    }

    .container {
      max-width: 800px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    .header img {
      width: 100%;
      height: auto;
      display: block;
    }

    .content {
      padding: 30px 40px;
    }

    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .content a.link {
      color: #113F67;
      font-weight: bold;
      text-decoration: underline;
    }

    ul {
      margin: 0 0 20px 20px;
      padding: 0;
      font-size: 16px;
    }

    li {
      margin-bottom: 10px;
    }

    .footer {
      background-color: #f0f0f0;
      padding: 25px 40px;
      font-size: 16px;
      color: #333;
      line-height: 1.8;
    }

    .footer strong {
      display: block;
      margin-bottom: 4px;
    }

    .footer a {
      color: #333;
      font-weight: bold;
      text-decoration: none;
    }

  </style>
</head>
<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <img src="https://i.postimg.cc/B6gn2XcY/photo-2025-09-17-12-47-14.jpg" alt="Startappss Logo">
    </div>

    <!-- Main Content -->
    <div class="content">
      <p>Dear <strong>Employee</strong>,</p>

      <p>
        We are pleased to officially welcome you to <strong>Startappss System India Pvt. Ltd.</strong> It gives us immense pleasure to extend this opportunity for you to be part of our growing organization.
      </p>

      <p>
        Your <strong>Appointment Letter</strong> is available at the following link:
        <br>
        <a href="${pdfUrl}" target="_blank" class="link">${pdfUrl}</a>
      </p>

      <h3 style="margin-top: 24px;">Next Steps:</h3>
      <ul>
        <li>Kindly download and review the attached Appointment Letter.</li>
        <li>If all terms are acceptable, please provide a signed copy (digital or physical) to the HR team within <strong>3 days</strong>.</li>
        <li>If you have any queries or require clarification on any clause, feel free to reach out to us before acknowledging the appointment.</li>
      </ul>

      <p>
        <strong>Note:</strong> Your appointment will be considered valid only upon receipt of your signed acceptance.
      </p>

      <p>
        We are confident that your skills and talent will contribute significantly to the success of our organization. Together, we aim to achieve new milestones and create a positive, productive workplace.
      </p>

      <p>
        Once again, congratulations and welcome aboard!
      </p>

        <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Thanks & Regards</strong>
  </div>

  <!-- HR Management Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>HR Management</strong>
  </div>

  <!-- Company Name Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Startappss Systems India Pvt Ltd</strong>
  </div>

  <!-- Location Section -->
  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Indore, Noida M.P. , India</strong>
  </div>

  <!-- Contact Information Section -->
 <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Email:</strong> <a href="mailto:hr@startappss.com" style="color: #333; font-weight: bold;">hr@startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Website:</strong> <a href="https://startappss.com" style="color: #333; font-weight: bold;">https://startappss.com</a>
  </div>

  <div style="font-size: 16px; font-weight: bold; color: #333;">
    <strong>Mobile No:</strong> <span style="color: #333; font-weight: bold;">9238920590</span>
  </div>
    </div>

   <!-- Footer -->
    <div class="footer">
      &copy; 2025 Startappss System India Pvt. Ltd. All rights reserved.
    </div>
  </div>
</body>
</body>
</html>

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

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Appointment Letter</title>
//   <style>
//  body {
//   margin: 0;
//   font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
//   background: #f0f0f0;
//   font-size: 15px;
//   line-height: 1.8;
//   color: #111;
// }

// .letter-page {
//   width: 794px;
//   height: 1123px;
//   margin: 20px auto;
//   padding: 0 70px 60px 70px;
//   background: #fff;
//   position: relative;
//   box-sizing: border-box;
// }

// .letter-header {
//   width: 100%;
//   margin: 0;
//   padding: 0;
//   position: relative;
//   left: -70px;
//   width: calc(100% + 140px);
// }

// .logo {
//   width: 100%;
//   height: auto;
//   display: block;
// }

//     /* Title */
//     .page-title {
//       text-align: center;
//       margin: 10px 0 25px 0;
//       font-size: 25px;
//       font-weight: bold;
//       text-decoration: underline;
//       letter-spacing: 1px;
//     }

//     /* Date on right */
//     .letter-date {
//       text-align: right;
//       margin-bottom: 10px;
//       font-weight: bold;
//     }

//     /* Content */
//     .letter-content {
//       margin-top: 10px;
//       text-align: justify;
//     }

//     .letter-content p {
//       margin: 12px 0;
//     }

//     /* Signature block */
//     .signature {
//       margin-top: 30px;
//       text-align: left;
//     }

//     .signature strong {
//       display: block;
//       margin-top: 5px;
//     }
// .company-sign {
//   text-align: left;
//   white-space: nowrap;
//   font-size: 14px;
//   margin-top: 5px;
// }

//    .letter-footer {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 12px 25px;
//   background: linear-gradient(to right, #f8f9fa, #e9ecef);
//   border-top: 2px solid #ccc;
//   font-size: 13px;
//   color: #444;
//   position: relative;
// }

// .letter-footer .footer-left,
// .letter-footer .footer-center,
// .letter-footer .footer-right {
//   flex: 1;
//   text-align: center;
// }

// .footer-left {
//   text-align: left;
// }

// .footer-center a {
//   text-decoration: none;
//   color: #0073e6;
//   font-weight: 500;
// }

// .footer-center a:hover {
//   text-decoration: underline;
// }

// .footer-right {
//   text-align: right;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   justify-content: flex-end;
// }

// .page-number {
//   font-style: italic;
//   color: #666;
// }

// .bottom-left-img {
//   width: 24px;
//   height: auto;
//   opacity: 0.7;
// }
//  .footer-header {
//       width: 100%;
//       margin: 0;
//       padding: 0;
//       position: relative;
//       left: -70px;
//       width: calc(100% + 140px);
//       /*margin-top: -50px;*/
//       margin-bottom: 10px;
//     }
//   </style>
// </head>
// <body>

//   <div class="letter-page">
// <!-- Header -->
// <header class="letter-header">
//   <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//        alt="Company Logo" class="logo">
// </header>

//   <!-- Date -->
//     <div class="letter-date">Date: 16/07/2025</div>
//     <!-- Heading -->
//     <h2 class="page-title">Appointment Letter</h2>

//     <!-- Content -->
//     <main class="letter-content">
//       <p><strong>Mr. Ishan Srivastava</strong><br>Indore (M.P.)</p>

//       <p>
//         We are pleased to promote you as a position of <strong>Junior Software Developer</strong>
//         on 15<sup>th</sup> July 2025 at <strong>Startappss Systems Private Limited</strong>.

//       </p>

//       <p>
//          Your place of work will normally be from <strong>Office</strong> but if the exigencies in company’s work so require,
//         you may be posted in any part of the world where there are company’s operations.
//         Enclosed are your terms and conditions of services and we shall be grateful if you will confirm
//         that these are acceptable to you by signing and returning the original documents.
//         Your compensation, other benefits and general terms and conditions are mentioned in
//         enclosed documents 1 & 2, which are enclosed with this letter.
//       </p>

//       <p>
//         Please also let us have the attached Employee Agreement, Non-Compete Agreement,
//         Non-Disclosure Agreement, and the application for employment form duly completed
//         along with 2 passport size photographs.
//       </p>

//       <p>
//         This offer is subject to your medical fitness, verification of your
//         educational certificates, credit check and satisfactory references.
//       </p>

// <p>
//         We look forward to your joining the company, and are sure that you will find this
//         to be a significant career move.
//       </p>

//       <!-- Signature -->
//       <div class="signature">
//         <p>Your Sincerely,</p>
//         <p>For <b>Startappss Systems Private Limited (Authorized – HR Department) </b></p>

//       </div>
//     </main>

//     <!-- Footer -->

//          <footer class="footer-header">
//       <div>
//         <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//              alt="Company Logo" class="logo">
//       </div>
//     </footer>
//   </div>

//   </div>
// <!-- Page 2 -->

// <div class="letter-page">
//   <!-- Header -->
//   <header class="letter-header">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo">
//   </header>

//   <h4 style="margin-top: 10px;">Enclosure: 1</h4>

//   <main class="letter-content">
//     <p><strong>ANNEXURE ‘A’: COMPENSATION DETAIL</strong> (Salary, applicable benefits and General Terms and Conditions)</p>

//     <p>
//       <strong>Name:</strong> Ishan Shrivastava<br>
//       <strong>Designation:</strong> Junior Software Developer<br>
//       <strong>Date of Joining:</strong> 15/07/2025
//     </p>
//  <h4 style="margin-top: 5px;">Salary Structure -</h4>
//     <!--<h3>Salary Structure</h3>-->

//     <table style="width: 100%; border-collapse: collapse; margin-top: 2px; font-size: 12px;">
//       <thead>
//         <tr style="background-color: #f2f2f2;">
//           <th style="border: 1px solid #bbb; padding: 4px 6px; text-align: left;">Component</th>
//           <th style="border: 1px solid #bbb; padding: 6px 8px; text-align: right;">Amount (INR)</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td style="border: 1px solid #ddd; padding: 6px 8px;">Basic Salary</td>
//           <td style="border: 1px solid #ddd; padding: 6px 8px; text-align: right;">2,00,000.00</td>
//         </tr>
//         <tr>
//           <td style="border: 1px solid #ddd; padding: 6px 8px;">House Rent Allowance (HRA)</td>
//           <td style="border: 1px solid #ddd; padding: 6px 8px; text-align: right;">1,00,000.00</td>
//         </tr>
//         <tr>
//           <td style="border: 1px solid #ddd; padding: 6px 8px;">Conveyance Allowance</td>
//           <td style="border: 1px solid #ddd; padding: 6px 8px; text-align: right;">30,000.00</td>
//         </tr>
//         <tr>
//           <td style="border: 1px solid #ddd; padding: 6px 8px;">Medical Allowance</td>
//           <td style="border: 1px solid #ddd; padding: 6px 8px; text-align: right;">20,000.00</td>
//         </tr>
//         <tr>
//           <td style="border: 1px solid #ddd; padding: 6px 8px;">Special Allowance</td>
//           <td style="border: 1px solid #ddd; padding: 6px 8px; text-align: right;">50,000.00</td>
//         </tr>
//         <tr style="font-weight: bold;">
//           <td style="border: 1px solid #bbb; padding: 6px 8px;">Total Salary</td>
//           <td style="border: 1px solid #bbb; padding: 6px 8px; text-align: right;">4,00,000.00</td>
//         </tr>
//       </tbody>
//     </table>

// <h4 style="margin-top: 20px;"> Terms & Conditions -</h4>
//     <ol style="padding-left: 18px; font-size: 12px;">
//       <li>Two months’ notice should be given by the employee before leaving the company along with resignation.</li>
//       <li>All salary dues shall be settled after successful completion of the notice period by attending the office and completing all pending tasks with proper handover of data/projects to the immediate senior or tech lead.</li>
//       <li>For any issue, you must inform the management in written form. Verbal communication shall not be entertained.</li>
//       <li>Leave shall be accepted only with the permission of the team leader. Approval/rejection of leave is at the sole discretion of the team leader, HR Manager, or Management. Leave cannot be claimed as a right.</li>
//       <li>You should inform your team leader before taking leave. You will be eligible for 1.5 Casual Leave (CL) per calendar month only after successful completion of the probation period.</li>
//       <li>Business tours or any office-related work shall take priority when applying for leave. Leaves will be granted based on work priorities.</li>
//     </ol>
//   </main>

//  <footer class="footer-header" style="margin-top: -80px;">
//   <div>
//     <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//          alt="Company Logo" class="logo">
//   </div>
// </footer>

//   </div>

// <!-- Page 3 -->
// <div class="letter-page">
//   <!-- Header -->
//   <header class="letter-header">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo">
//   </header>

//   <main class="letter-content">
//     <!-- Introduction -->
//     <h3 style="margin-top: 40px;">Dear Ishan Shrivastava,</h3>
//     <p>Welcome to the dynamic, growing, and ethical team. Following is a list of instructions that must be followed by all of us during our working. Please read it carefully and follow these guidelines:</p>

//     <!-- Instructions List -->
//     <ol style="padding-left: 18px; font-size: 14px; line-height: 1.6;">
//       <li>Undertake short-term or long-term projects to address a variety of issues and needs.</li>
//       <li>Meet with management or appropriate staff to understand their requirements.</li>
//       <li>Conduct situational and data analysis to identify and understand a problem or issue.</li>
//       <li>Present and explain findings to appropriate executives.</li>
//       <li>Provide advice or suggestions for improvement according to objectives.</li>
//       <li>Formulate plans to implement recommendations and overcome objections.</li>
//       <li>Arrange for or provide training to people affected by change.</li>
//       <li>Evaluate the situation periodically and make adjustments when needed.</li>
//       <li>Replenish knowledge of industry, products, and field.</li>
//     </ol>

//     <!-- Closing Text -->
//     <p style="font-size: 14px; font-weight: bold;">Best of Luck!</p>
//     <p style="font-size: 14px; font-weight: bold;">For Startappss Systems Private Limited</p>

//     <!-- Authorized Signature Space -->
//     <div style="display: flex; flex-direction: column; align-items: left; justify-content: flex-end; margin-top: 20px;">
//         <img src="https://i.postimg.cc/NfRydxsM/photo-2025-09-17-11-38-06-removebg-preview-1.png"
//              alt="Authorized Signature" style="width: 120px; height: auto; margin-top: 10px;">
//         <p><strong>Authorized Signature</strong></p>
//     </div>
// </main>

//   <footer class="footer-header" style="margin-top: 60px;">
//     <div>
//       <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//            alt="Company Logo" class="logo">
//     </div>
//   </footer>
//   </div>

// <!-- Page 4 -->
// <div class="letter-page">
//   <!-- Header -->
//   <header class="letter-header">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo">
//   </header>

//   <main class="letter-content">
//     <!-- Confidential Information Section -->
//     <h4 style="text-align: center; font-size: 13px; font-weight: bold; margin-top: 10px;">Confidential Information</h4>

//     <p style="font-size: 14px; margin-top: 10px;">
//       Due to your access to confidential information, all employees of Startappss Systems Private Limited must sign this agreement.
//       <strong>“Confidential information”</strong> means any information of a secret or confidential nature relating to the workplace.
//       Confidential information may include, but is not limited to, the following: trade secrets, proprietary information, customer information, customer lists, methods, plans, documents, data, drawings, manuals, notebooks, reports, models, inventions, formulas, processes, software, information systems, contracts, negotiations, strategic planning, proposals, business alliances, and training materials.
//       In connection with being enrolled in Startappss Systems Pvt Ltd, I agree to the following:
//     </p>

//     <p style="font-size: 14px;">
//      <b>I have read and understand the above definition of “confidential information.” I agree that I will not at any time, both during and after my employment in Startappss Systems, communicate or disclose confidential information to any person, corporation, or entity.

//       I further recognize and agree that while in Startappss Systems, I may become aware of nonpublic information of a personal nature about employees or associates, including, without limitation, actions, omissions, statements, or personally identifiable medical, family, financial, social, behavioral, or other personal or private information.

//       I will not disclose any such information that I learn or get to know to any other person or entity, unless required by applicable law or legal process.
//       </b>
//     </p>

//     <!-- Signature Section: Aligned Left -->
//     <div style="margin-top: 40px; font-size: 14px; text-align: left;">
//       <p><strong>EMPLOYEE</strong></p>
//       <p>Ishan Shrivastava</p>
//       <p>By:</p>
//       <p><strong>COMPANY</strong></p>
//       <p>Startappss Systems Private Limited</p>
//       <p>By: Nihal Jaiswal</p>
//       <p><strong>Title: Director | CEO</strong></p>
//     </div>

//   </main>

//      <footer class="footer-header" style="margin-top: -60px;">
//     <div>
//       <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//            alt="Company Logo" class="logo">
//     </div>
//   </footer>
//   </div>

// <!-- Page 5 -->
// <div class="letter-page" style="display: flex; flex-direction: column; min-height: 100vh;">
//   <!-- Header -->
//   <header class="letter-header" style="text-align: center; padding-top: 20px;">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo" style="max-width: 100%; height: auto;">
//   </header>

//   <main class="letter-content" style="font-family: Arial, sans-serif; line-height: 1.3; flex-grow: 1;">
//     <h5 style="text-align: center; font-weight: bold; font-size: 16px; margin-top: 18px;">
//       Employee Non-Disclosure and Confidentiality Agreement
//     </h5>

// <p style="font-size: 14px; text-align: justify; margin-top: 10px;">
//       This Employee Non-Disclosure and Confidentiality Agreement (this “Agreement”) is entered into as of the 15th July 2025 (the “Effective Date”) by and between Startappss Systems Private Limited (the “Company”), and Mr. Ishan Shrivastava, an employee of the Company (the “Employee”). The above parties may be referred to singularly as a “Party” or collectively as the “Parties”. The Company hired Employee as Ishan Shrivastava pursuant to the terms and conditions of that certain Employment Agreement executed between the Parties on the July 15th, 2025 (the “Employment Agreement”). In connection with the Employee’s duties under the Employment Agreement, the Company may disclose to the Employee certain confidential and proprietary information unique and valuable to its ongoing business operations. In consideration of the mutual promises set forth herein, the Parties agree as follows:
//     </p>

//     <!-- Confidential Information Section -->
//     <h5 style="font-weight: bold; margin-top: 5px;">1. Confidential Information</h5>
//     <p style="font-size: 14px; text-align: justify;">
//       The term “Confidential Information” as used in this Agreement shall mean any data, information, or knowledge disclosed by the Company to the Employee and not generally known to the public, including but not limited to:
//     </p>

//     <ul style="font-size: 14px; margin-left: 30px; list-style-type: disc;">
//       <li>The Company’s business or operational plans or activities, existing or contemplated markets, advertising initiatives, methods of operation, products, or services;</li>
//       <li>The Company’s suppliers or logistics data;</li>
//       <li>The Company’s customer or supplier lists, cost of goods or services, profits and losses, budgeting, past or future sales, or financial information;</li>
//       <li>The Company’s schematics, designs, software source or object code, compressed or uncompressed binaries, inventions, patents or patent applications, or illustrations;</li>
//       <li>The Company’s existing or contemplated designs, models or platforms, formulas, research, notes, or analytical data;</li>
//       <li>The Company’s management, board of directors, affiliates, suppliers, customers, employees, or third-party contractors;</li>
//       <li>The Company’s history, entity structure, accounts, or goodwill; the Company’s copyrights, trademarks, trade secrets, patents, trade names, moral rights, or any other tangible or intangible rights, whether registered or unregistered;</li>
//       <li>The Company’s technical systems, processes, methods, algorithms, computational schemas, know-how, or trade secrets;</li>
//       <li>The Company’s employees, salaries, job-related functions, duties or responsibilities; the Company’s written, auditory or electronic communications;</li>
//       <li>Any information that if disclosed, whether true or untrue, could harm the goodwill or reputation of the Company or the Company’s management, board of directors, affiliates, suppliers, customers, employees, third-party contractors, methods of operation, products, or services;</li>
//       <li>Any other information of whatever kind and nature that the Company desires to maintain confidential.</li>
//     </ul>
//      <!-- Confidential Information Section -->
//     <h5 style="font-weight: bold; margin-top: 5px;">    2. Exclusions to Confidential Information.</h5> <p> The obligation of confidentiality with respect to Confidential Informationwill notapplytoany information.
// </p>

//   </main>

//      <footer class="footer-header" style="margin-top: 80px;">
//     <div>
//       <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//            alt="Company Logo" class="logo">
//     </div>
//   </footer>
//   </div>

// <!-- Page 6 -->
// <div class="letter-page" style="display: flex; flex-direction: column; min-height: 100vh;">
//   <!-- Header -->
//   <header class="letter-header" style="text-align: center; padding-top: 20px;">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo" style="max-width: 100%; height: auto;">
//   </header>

//   <main class="letter-content" style="font-family: Arial, sans-serif; line-height: 1.3; flex-grow: 1;">

//     <p style="font-size: 14px; text-align: justify; margin-top: 10px;">
//       The Employee agrees to keep confidential all information disclosed by the Company as set forth in this Agreement. However, the confidentiality obligations shall not apply to any information that:
//     </p>

//     <ul style="font-size: 14px; margin-left: 30px; list-style-type: disc;">
//       <li><strong>a.</strong> If the information is or was received by the Employee from a third-party source which, to the best knowledge of the Employee, is or was not under a confidentiality obligation to the Company with regard to such information;</li>
//       <li><strong>b.</strong> If the information is disclosed by the Employee with the Company’s prior written permission and approval;</li>
//       <li><strong>c.</strong> If the information is independently developed by the Employee prior to disclosure by the Company and without the use and benefit of any of the Company’s Confidential Information;</li>
//       <li><strong>d.</strong> If the Employee is legally compelled by applicable law, by any court, governmental agency, or regulatory authority, or subpoena or discovery request in pending litigation, but only if, to the extent lawful, the Employee gives prompt written notice of that fact to the Company prior to disclosure so that the Company may request a protective order or other remedy, and the Employee may disclose only such portion of the Confidential Information which it is legally obligated to disclose.</li>
//     </ul>

//     <h5 style="font-weight: bold; margin-top: 5px;">4. Obligation to Maintain Confidentiality</h5>

//     <p style="font-size: 14px; text-align: justify;">
//       With respect to Confidential Information, the Employee agrees to the following:
//     </p>

// <ul style="font-size: 14px; margin-left: 30px; list-style-type: disc;">
//       <li><strong>a.</strong> The Employee agrees to retain the Confidential Information in strict confidence, to protect the security, integrity, and confidentiality of such information and to not permit unauthorized access to or unauthorized use, disclosure, publication, or dissemination of Confidential Information except in conformity with this Agreement.</li>
//       <li><strong>b.</strong> Confidential Information is and will remain the sole and exclusive property of the Company and will not be disclosed or revealed by the Employee, except (i) to other employees of the Company who have a need to know such information and agree to be bound by the terms of this Agreement, or (ii) with the Company’s express prior written consent.</li>
//       <li><strong>c.</strong> The Employee agrees that, in the event the Employee must download, access, process, transfer, or otherwise communicate Confidential Information, the Employee will comply with all laws and regulations applicable to exports and re-exports of data and information and will not, directly or indirectly, export or re-export any Confidential Information in violation of such laws and regulations, including without limitation, those prohibiting export or re-export to restricted countries or without governmental authorization.</li>
//       <li><strong>d.</strong> Upon termination of this Agreement or at the request of the Company, the Employee will ensure that all Confidential Information and all documents, memoranda, notes, and other writings or electronic records prepared by the Employee that include or reflect any Confidential Information in the Employee’s actual or constructive possession are returned to the Company within 24 hours.</li>
//       <li><strong>e.</strong> The obligation not to disclose Confidential Information shall survive the termination of this Agreement.</li>
//     </ul>

//   </main>

//      <footer class="footer-header" style="margin-top: 80px;">
//     <div>
//       <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//            alt="Company Logo" class="logo">
//     </div>
//   </footer>
//   </div>

// <!-- Page 7 -->
// <div class="letter-page" style="display: flex; flex-direction: column; min-height: 100vh; font-family: Arial, sans-serif;">
//   <!-- Header -->
//   <header class="letter-header" style="text-align: center; padding-top: 10px;">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo" style="max-width: 100%; height: auto;">
//   </header>

//   <main class="letter-content" style="flex-grow: 1; padding: 0 20px; line-height: 1.4; font-size: 13px;">
//     <p style="text-align: justify; margin-top: 8px;">
//       The obligations set forth in this Agreement shall remain in effect, and at no time will the Employee be permitted to disclose Confidential Information, except to the extent that such Confidential Information is excluded from the obligations of confidentiality under this Agreement pursuant to Paragraph 2 above.
//     </p>

// <p style="text-align: justify;">
//       The obligation not to disclose Confidential Information shall remain in effect until two years following the Employee’s termination of employment by the Company, except to the extent that such Confidential Information is excluded from the obligations of confidentiality under this Agreement pursuant to Paragraph 2 above.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; font-size: 14px;">5. Disclaimer</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       There is no representation or warranty, express or implied, made by the Company as to the accuracy or completeness of any of its Confidential Information.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; font-size: 14px;">6. Remedies</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       The Employee acknowledges that use or disclosure of any confidential and proprietary information in a manner inconsistent with this Agreement will give rise to irreparable injury for which damages would not be an adequate remedy. Accordingly, in addition to any other legal remedies which may be available at law or in equity, the Company shall be entitled to equitable or injunctive relief against the unauthorized use or disclosure of confidential and proprietary information. The Company shall be entitled to pursue any other legally permissible remedy available as a result of such breach, including but not limited to damages, both direct and consequential.
//     </p>

//     <p style="text-align: justify; margin-bottom: 10px;">
//       In any action brought by the Company under this Section, the Company shall be entitled to recover its attorney’s fees and costs from the Employee.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; font-size: 14px;">7. Notices</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       All notices given under this Agreement must be in writing. A notice is effective upon receipt and shall be sent via one of the following methods: delivery in person, overnight courier service, certified or registered mail, postage prepaid, return receipt requested, addressed to the Party to be notified at the below address or by facsimile at the below facsimile number or, in the case of either Party, to such other party, address, or facsimile number as such Party may designate upon reasonable notice to the other Party.
//     </p>

//     <!--<h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px; font-size: 14px;">Contact Information</h5>-->
//     <div style="display: flex; flex-direction: column; margin-left: -20px; margin-top: 25px;">
//       <div style="margin-bottom: 6px;">
//         <strong>Startappss Systems Private Limited</strong><br><br><br>
//       <b>  Nihal Jaiswal | Director</b><br>
//        <b> Phone No.: +91 91791 24446 </b><br>
//        <b> Register Office: 93 Heera Bagh, Opp Skye Corporate, AB Road, Indore 452010 </b>
//       </div>
//       <br>
//       <br>
//       <br>
//       <div style="margin-bottom: 6px;">
//         <strong>Ishan Shrivastava</strong><br>
//        <strong>Phone No.: +91 6392472195</strong>
//       </div>
//     </div>
//   </main>

//     <footer class="footer-header">
//       <div>
//         <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//              alt="Company Logo" class="logo">
//       </div>
//     </footer>
//   </div>

// <!-- Page 8 -->
// <div class="letter-page" style="display: flex; flex-direction: column; min-height: 100vh; font-family: Arial, sans-serif;">
//   <!-- Header -->
//   <header class="letter-header" style="text-align: center; padding-top: 10px;">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo" style="max-width: 100%; height: auto;">
//   </header>

//   <main class="letter-content" style="flex-grow: 1; padding: 0 20px; line-height: 1.4; font-size: 13px;">

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">7. Termination</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       This Agreement will terminate on the earlier of: (a) the written agreement of the Parties to terminate this Agreement; (b) the cessation of the Employee’s employment; or (c) one year from the date hereof.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">8. Amendment</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       This Agreement may be amended or modified only by a written agreement signed by both of the Parties.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">9. Jurisdiction</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       This Agreement will be governed by and construed in accordance with the laws of the State of Madhya Pradesh, without regard to the principles of conflict of laws. Any dispute arising from this Agreement shall be resolved in the courts of the State of Madhya Pradesh.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">10. No Offer or Sale</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       Nothing in this Agreement will be deemed a sale or offer for sale of Confidential Information nor obligate the Company to grant the Employee a license or any rights, by statute, common law theory of estoppel or otherwise, to Confidential Information.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">11. Entire Agreement</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       This Agreement constitutes the entire agreement between the Parties and supersedes all prior or contemporaneous negotiations, discussions, or agreements, whether written or oral, regarding the subject matter hereof.
//     </p>

//     <h5 style="font-weight: bold; margin-top: 10px; margin-bottom: 5px;">12. Miscellaneous</h5>
//     <p style="text-align: justify; margin-bottom: 10px;">
//       No joint venture, partnership, or agency relationship exists between the Employee, the Company, or any third-party as a result of this Agreement. This Agreement will inure to the benefit of and be binding on the respective successors and permitted assigns of the parties. Neither Party may assign its rights or delegate its duties under this Agreement without the other Party’s prior written consent. In the event that any provision of this Agreement is held to be invalid, illegal or unenforceable in whole or in part, the remaining provisions shall not be affected and shall continue to be valid, legal and enforceable as though the invalid, illegal or unenforceable parts had not been included in this Agreement. Neither Party will be charged with any waiver of any provision of this Agreement, unless such waiver is evidenced by a writing signed by the Party and any such waiver will be limited to the terms of such writing.
//     </p>
//   </main>

//    <footer class="footer-header">
//       <div>
//         <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//              alt="Company Logo" class="logo">
//       </div>
//     </footer>
//   </div>

// <!-- Page 9 -->
// <div class="letter-page" style="display: flex; flex-direction: column; min-height: 100vh; font-family: Arial, sans-serif;">
//   <!-- Header -->
//   <header class="letter-header" style="text-align: center; padding-top: 10px;">
//     <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg"
//          alt="Company Logo" class="logo" style="max-width: 100%; height: auto;">
//   </header>

//   <main class="letter-content" style="flex-grow: 1; padding: 0 20px; line-height: 1.4; font-size: 13px; text-align: left; margin-top: 40px;">

//     <p style="font-size: 14px; text-align: left; margin-bottom: 30px;">
//     <b>  IN WITNESS WHEREOF, </b> the Parties hereto have executed this Agreement as of the date first written above.
//     </p>

//     <div style="font-size: 14px; text-align: left; margin-bottom: 30px;">
//       <strong>EMPLOYEE</strong><br>
//       <b>Mr. Ishan Shrivastava</b><br><br>
//       <div style="margin-top: 40px;">By: _______________________</div>
//     </div>

//     <div style="font-size: 14px; text-align: left;">
//       <strong>COMPANY</strong><br>
//       <strong>Startappss Systems Private Limited</strong><br><br> <br> <br> <br>
//       <strong>By:</strong> _______________________ <br>
//       Name: Nihal Jaiswal<br>
//       Title: Director | CEO
//     </div>

//   </main>
//   <footer class="footer-header" style="margin-top: 50px;">
//   <div>
//     <img src="https://i.postimg.cc/zfdqkbKf/photo-2025-09-17-15-20-52.jpg"
//          alt="Company Logo" class="logo">
//   </div>
// </footer>

//   </div>

// </body>
// </html>

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Appointment Letter</title>
//   <style>
//     body {
//       margin: 0;
//       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//       background-color: #eaf7f3;
//       color: #333;
//     }

//     .container {
//       max-width: 1200px;
//       width: 100%;
//       margin: 30px auto;
//       background-color: #ffffff;
//       border-radius: 12px;
//       overflow: hidden;
//       box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
//     }

//     /* Header Image Full Width */
//     .letter-header {
//       width: 100%;
//       margin: 0;
//       padding: 0;
//     }

//     .logo {
//       width: 100%;
//       height: auto;
//       display: block;
//     }

//     /* Content Styles */
//     .letter-content {
//       padding: 30px 40px;
//       background-color: #ffffff;
//       color: #333;
//       line-height: 1.6;
//     }

//     .letter-content p {
//       margin: 12px 0;
//     }

//     .footer {
//       background-color: #f4f7f9;
//       padding: 20px;
//       text-align: center;
//       color: #888888;
//       font-size: 14px;
//     }

//     /* Animation for the header title */
//     @keyframes fadeIn {
//       0% { opacity: 0; transform: translateY(-20px); }
//       100% { opacity: 1; transform: translateY(0); }
//     }
//   </style>
// </head>
// <body>

//   <div class="container">
//     <!-- Full-width Header with Image -->
//     <header class="letter-header">
//       <img src="https://i.postimg.cc/65TGJ1s5/photo-2025-09-17-12-47-14.jpg" alt="Company Logo" class="logo">
//     </header>

//     <!-- Content Section -->
//     <div class="letter-content">
//       <p style="font-size: 18px; margin-bottom: 15px;">Dear <strong>${name}</strong>,</p>
//       <p style="font-size: 16px; margin-bottom: 20px;">
//         Welcome to <strong>Startappss System India Pvt.</strong> Ltd. We're thrilled to have you onboard! Your <strong>HRMS</strong> (Human Resource Management System) account is now ready to use. This system will be your one-stop platform for managing attendance, leave requests, payroll, and internal communication. Get ready to streamline your experience!
//       </p>

//       <p style="font-size: 20px; color: #333; font-weight: 300; margin-bottom: 15px;">Your login credentials are as follows:</p>
//       <ul style="font-size: 16px; line-height: 1.7; list-style-type: disc; padding-left: 20px; color: #333; margin-bottom: 25px;">
//         <li style="margin-bottom: 10px;"><strong>Login ID / Email:</strong> <span style="color: #333;">${email}</span></li>
//         <li style="margin-bottom: 10px;"><strong>Temporary Password:</strong> <span style="color: #333;">${password}</span></li>
//         <li style="margin-bottom: 10px;">
//           <strong>Portal Link:</strong>
//           <a href="https://hrms-startapps-3gm5.vercel.app/" target="_blank" style="color: #333; text-decoration: none; font-weight: 600; transition: color 0.3s ease-in-out; border-bottom: 2px solid #2196F3;"> Click here to login </a>
//         </li>
//       </ul>

//       <h3 style="font-size: 20px;  color: #333; font-weight: 300; margin-bottom: 15px;">Next Steps:</h3>
//       <ol style="font-size: 16px; padding-left: 1px; list-style-type: none; margin-bottom: 25px; color: #333;">
//         <li style="margin-bottom: 10px;">1) Log in using the credentials provided above.</li>
//         <li style="margin-bottom: 10px;">2) Immediately reset your password after your first login for security purposes.</li>
//         <li style="margin-bottom: 10px;">3) Update your profile and upload any pending documents to complete your setup.</li>
//       </ol>

//       <p style="font-size: 16px; color: #E53E3E; font-weight: 600; margin-bottom: 6px;">Important:</p>
//       <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">
//         For your security, please keep your login credentials confidential. This account is linked to your personal and employee records. Do not share your credentials with anyone.
//       </p>

//       <p style="font-size: 16px; line-height: 1.5; color: #333; margin-bottom: 6px;">
//         For technical or login assistance, feel free to contact us at <a href="mailto:hr@startappss.com" style="color: #333;">hr@startappss.com</a> or reach out to the HR department directly.
//       </p>

//     <div style="font-size: 16px; line-height: 1.7; color: #333;">
//   <p>We are excited to have you as part of our team, and we look forward to your success at Startappss!</p>

//   <div style="font-size: 16px; font-weight: bold; color: #333;">
//     <strong>Thanks & Regards</strong>
//   </div>

//   <!-- HR Management Section -->
//  <div style="font-size: 16px; font-weight: bold; color: #333;">
//     <strong>HR Management</strong>
//   </div>

//   <!-- Company Name Section -->
//   <div style="font-size: 16px; font-weight: bold; color: #333;">
//     <strong>Startappss Systems India Pvt Ltd</strong>
//   </div>

//   <!-- Location Section -->
//   <div style="font-size: 16px; font-weight: bold; color: #333;">
//     <strong>Indore, Noida M.P. , India</strong>
//   </div>

//   <!-- Contact Information Section -->
//  <div style="font-size: 16px; font-weight: bold; color: #333;">
//     <strong>Email:</strong> <a href="mailto:hr@startappss.com" style="color: #333; font-weight: bold;">hr@startappss.com</a>
//   </div>

//   <div style="font-size: 16px; font-weight: bold; color: #333;">
//     <strong>Website:</strong> <a href="https://startappss.com" style="color: #333; font-weight: bold;">https://startappss.com</a>
//   </div>

//   <div style="font-size: 16px; font-weight: bold; color: #333;">
//     <strong>Mobile No:</strong> <span style="color: #333; font-weight: bold;">9238920590</span>
//   </div>
// </div>

//       </div>
//     </div>

//     <!-- Footer Section -->
//     <div class="footer">
//       <p>&copy; 2025 Startappss System India Pvt. Ltd. All rights reserved.</p>
//     </div>
//   </div>

// </body>
// </html>
