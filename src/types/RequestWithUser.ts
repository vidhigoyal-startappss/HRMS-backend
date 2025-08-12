import { Request } from 'express';
import { JwtPayload } from '../auth/strategy/jwt-payload.interface';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
