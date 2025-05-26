import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManageUsersController } from './manage-users.controller';
import { ManageUsersService } from './manage-users.service';
import { User, UserSchema } from '../auth/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [ManageUsersController],
  providers: [ManageUsersService],
})
export class ManageUsersModule {}
