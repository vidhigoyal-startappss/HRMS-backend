import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { Leave, LeaveSchema } from './schemas/leave.schema';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { NotificationModule } from 'src/notification/notification.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leave.name, schema: LeaveSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
    NotificationModule, 
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
