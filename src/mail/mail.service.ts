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
      socketTimeout: 30000, // Timeout set to 30 seconds (default is usually 10 seconds)
      connectionTimeout: 30000,
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
    const formLink = `https://hrms1-kappa.vercel.app/onboarding/${token}`;

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
    } catch (error) {
      console.error("Error sending appointment letter email:", error);
      throw error;
    }
  }
}
