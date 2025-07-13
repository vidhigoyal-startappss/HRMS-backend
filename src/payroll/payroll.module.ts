import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payroll, PayrollSchema } from './schemas/payroll.schema';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Payroll.name, schema: PayrollSchema }])],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
