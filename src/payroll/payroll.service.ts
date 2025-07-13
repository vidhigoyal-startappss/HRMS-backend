import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payroll, PayrollDocument } from './schemas/payroll.schema';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollService {
  constructor(
    @InjectModel(Payroll.name) private payrollModel: Model<PayrollDocument>,
  ) {}

  async createPayroll(createPayrollDto: CreatePayrollDto) {
    const payroll = new this.payrollModel(createPayrollDto);
    return payroll.save();
  }

  async findAll(user: { userId: string; customPermissions: Record<string, string[]> }) {
    if (user.customPermissions['payroll']?.includes('readAll')) {
      return this.payrollModel.find().exec();
    }

    if (user.customPermissions['payroll']?.includes('read')) {
      return this.payrollModel.find({ userId: user.userId }).exec();
    }

    throw new ForbiddenException('Access denied');
  }

  async findOne(user: { userId: string; customPermissions: Record<string, string[]> }, id: string) {
    const payroll = await this.payrollModel.findById(id).exec();

    if (!payroll) {
      throw new Error('Payroll record not found');
    }

    if (payroll.userId !== user.userId && !user.customPermissions['payroll']?.includes('readAll')) {
      throw new ForbiddenException('Access denied');
    }

    return payroll;
  }

  async updatePayroll(id: string, updatePayrollDto: UpdatePayrollDto) {
    return this.payrollModel.findByIdAndUpdate(id, updatePayrollDto, { new: true });
  }

  async deletePayroll(id: string) {
    return this.payrollModel.findByIdAndDelete(id).exec();
  }
}
