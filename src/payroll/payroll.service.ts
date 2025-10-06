import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Payroll, PayrollDocument } from "./schemas/payroll.schema";
import { CreatePayrollDto } from "./dto/create-payroll.dto";
import { uploadPdfToCloudinary } from "../common/utils/uploadPdfToCloudinary";

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(Payroll.name) private payrollModel: Model<PayrollDocument>
  ) {}

  async createPayroll(
    createPayrollDto: CreatePayrollDto,
    file: Express.Multer.File
  ) {
    if (!file) {
      throw new Error("Payslip PDF file is required");
    }

    const cloudinaryUrl = await uploadPdfToCloudinary(file.buffer, "payrolls");

    const { employeeId, month } = createPayrollDto;

    let payrollDoc = await this.payrollModel.findOne({ employeeId });

    if (!payrollDoc) {
      payrollDoc = new this.payrollModel({
        employeeId,
        payrolls: [
          {
            month,
            payrollSlipUrl: cloudinaryUrl,
          },
        ],
      });

      return payrollDoc.save();
    } else {
      const alreadyExists = payrollDoc.payrolls.some((p) => p.month === month);
      if (alreadyExists) {
        throw new Error("Payslip already uploaded for this employee and month");
      }

      payrollDoc.payrolls.push({
        month,
        payrollSlipUrl: cloudinaryUrl,
      });

      return payrollDoc.save();
    }
  }
  async findOne(
    user: { userId: string; customPermissions: Record<string, string[]> },
    id: string
  ) {
    const payroll = await this.payrollModel.findById(id).exec();

    if (!payroll) {
      throw new Error("Payroll record not found");
    }
    if (
      payroll.employeeId !== user.userId &&
      !user.customPermissions["payroll"]?.includes("readAll")
    ) {
      throw new ForbiddenException("Access denied");
    }

    return payroll;
  }

  async getPayrollsByEmployee(employeeId: string) {
    const payroll = await this.payrollModel.findOne({ employeeId });

    if (!payroll) {
      throw new Error("No payroll data found for this employee");
    }

    return {
      employeeId,
      payrolls: payroll.payrolls,
    };
  }
}
