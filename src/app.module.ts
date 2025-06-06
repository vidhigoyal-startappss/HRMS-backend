import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { EmployeeModule } from './employee/employee.module';

// Load .env variables
dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(mongoUri),
    AuthModule,
    EmployeeModule,
  ],
})
export class AppModule {}
