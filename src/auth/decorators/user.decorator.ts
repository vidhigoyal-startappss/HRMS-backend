import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../strategy/jwt-payload.interface'; // adjust path

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
