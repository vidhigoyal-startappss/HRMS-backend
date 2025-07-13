import { SetMetadata } from '@nestjs/common';

export const SELF_OR_ROLE_KEY = 'self_or_role';

export const SelfOrRole = (...roles: string[]) =>
  SetMetadata(SELF_OR_ROLE_KEY, roles);