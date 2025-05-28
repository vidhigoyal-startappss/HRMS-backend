import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // ✅ Import this too

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env variables accessible globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || '',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule, // ✅ Add this line to enable /signup and /login routes
  ],
})
export class AppModule {}
