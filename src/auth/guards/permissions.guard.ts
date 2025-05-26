import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS } from '../constants/permissions.constant';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<{ resource: string; action: string }>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userPermissions = PERMISSIONS[user.role]?.[requiredPermissions.resource] || [];

    if (!userPermissions.includes(requiredPermissions.action)) {
      throw new ForbiddenException(
        `You do not have permission to ${requiredPermissions.action} ${requiredPermissions.resource}`,
      );
    }

    return true;
  }
}
