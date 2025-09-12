import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";
import { AuthModule } from "./auth/auth.module";
import { LeaveModule } from "./leave/leave.module";
import { ManageUsersModule } from "./manage-users/manage-users.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { PayrollModule } from "./payroll/payroll.module";
import { EventsModule } from "./events/events.module";
import { MulterModule } from "@nestjs/platform-express";
import { ScheduleModule } from "@nestjs/schedule";
import { PrometheusModule } from "./prometheus/prometheus.module";
import { PrometheusMiddleware } from "./prometheus/prometheus.middleware";
import { OnboardingModule } from "./user_on_boarding/onboarding.module";
import { LetterModule } from "./letter/letter.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.number().default(3000),
        CORS_ORIGIN: Joi.string().uri().default("http://localhost:3001"),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI"),
      }),
    }),
    MulterModule.register({
      dest: "./uploads",
    }),
    AuthModule,
    LeaveModule,
    ManageUsersModule,
    AttendanceModule,
    PayrollModule,
    EventsModule,
    PrometheusModule,
    OnboardingModule,
    LetterModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PrometheusMiddleware).forRoutes("*");
  }
}
