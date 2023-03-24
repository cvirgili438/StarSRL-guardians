import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY } from 'src/constants/key.decorator';
import { ROLS } from 'src/constants/Rols';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLS.ADMIN);
