import { SetMetadata } from '@nestjs/common';
import { USER_ID_KEY } from 'src/constants/key.decorator';

import { UUIDUser } from 'src/users/dto/user.dto';

export const idUserDecorator = (id: string) => SetMetadata(USER_ID_KEY, id);
