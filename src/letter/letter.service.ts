import { Injectable } from "@nestjs/common";

@Injectable()
export class LetterService {
  private signedLetters = new Map<string, string>();

  saveSignedLetter(userId: string, url: string): void {
    this.signedLetters.set(userId, url);
  }

  getSignedLetterUrl(userId: string): string | null {
    return this.signedLetters.get(userId) || null;
  }
}
