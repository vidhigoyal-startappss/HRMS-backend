import { SetMetadata } from '@nestjs/common';

export const Permissions = (resource: string, action: string) =>
  SetMetadata('permissions', { resource, action });
