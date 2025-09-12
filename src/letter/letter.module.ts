import { Module } from '@nestjs/common';
import { LetterController } from './letter.controller';
import { EmailModule } from '../mail/mail.module';
import { LetterService } from './letter.service';

@Module({
  imports: [EmailModule],
  controllers: [LetterController],
  providers: [LetterService],
})
export class LetterModule {}