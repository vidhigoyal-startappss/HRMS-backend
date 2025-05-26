import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { LeaveModule } from './leave/leave.module';
import { ManageUsersModule } from './manage-users/manage-users.module';
import { AttendanceModule } from './attendance/attendance.module';
// import { env } from '../env'; // Import environment variables
@Module({
  imports: [
    // Load environment variables globally and validate them
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().uri().required(), // MongoDB connection string
        JWT_SECRET: Joi.string().min(32).required(), // Secure JWT secret
        PORT: Joi.number().default(3000), // Default server port
        CORS_ORIGIN: Joi.string().uri().default('http://localhost:5173'), // CORS origin
      }),
    }),

    // Asynchronous MongoDB connection using Mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Get MongoDB URI from environment variables
      }),
    }),

    // Import feature modules
    AuthModule,
    LeaveModule,
    ManageUsersModule,
    AttendanceModule,
  ],
})
export class AppModule {}
