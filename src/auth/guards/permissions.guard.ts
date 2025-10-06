import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS } from "../constants/permissions.constant";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<{
      resource: string;
      action: string;
    }>("permissions", context.getHandler());

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const resource = requiredPermissions.resource;
    const action = requiredPermissions.action;

    const roleBasedPerms = PERMISSIONS[user.role]?.[resource] || [];
    const customPerms = user.customPermissions?.[resource] || [];

    const allPerms = Array.from(new Set([...roleBasedPerms, ...customPerms]));

    if (!allPerms.includes(action)) {
      throw new ForbiddenException(
        `You do not have permission to ${action} ${resource}`
      );
    }

    return true;
  }
}
