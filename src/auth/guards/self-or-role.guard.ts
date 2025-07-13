import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class SelfOrRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = request.params.id;

    if (!user) throw new ForbiddenException('User not authenticated');

    // If user has one of the allowed roles, allow
    if (allowedRoles && allowedRoles.includes(user.role) && user.role!=="Employee") return true;

    // If user is Employee and accessing own data
    if (user.role === 'Employee' && JSON.stringify(user.userId) === JSON.stringify(paramId)) return true;
    throw new ForbiddenException('Access denied: Not authorized to access this resource');
  }
}