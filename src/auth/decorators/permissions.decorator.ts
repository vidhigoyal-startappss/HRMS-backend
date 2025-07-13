import { SetMetadata } from '@nestjs/common';

export const Permissions = (permission: { resource: string; action: string }) =>
  SetMetadata('permissions', permission);
