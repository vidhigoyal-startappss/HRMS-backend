import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { CreatePayrollDto } from "./dto/create-payroll.dto";
import { PayrollService } from "./payroll.service";

@Controller("payrolls")
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}
  @Get(":employeeId")
  async getPayrollsByEmployee(@Param("employeeId") employeeId: string) {
    return this.payrollService.getPayrollsByEmployee(employeeId);
  }
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new BadRequestException("Only PDF files are allowed"), false);
        }
      },
    })
  )
  async uploadPayslip(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPayrollDto: CreatePayrollDto
  ) {
    if (!createPayrollDto.employeeId) {
      throw new BadRequestException("employeeId is required");
    }
    if (!createPayrollDto.month) {
      throw new BadRequestException("month is required");
    }
    return this.payrollService.createPayroll(createPayrollDto, file);
  }
}
