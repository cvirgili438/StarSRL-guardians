import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/key.decorator';
import { ROLS } from 'src/constants/Rols';

export const Roles = (...roles: Array<keyof typeof ROLS>) =>
  SetMetadata(ROLES_KEY, roles);
