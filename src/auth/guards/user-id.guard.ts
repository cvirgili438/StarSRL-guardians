import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
  USER_ID_KEY,
} from 'src/constants/key.decorator';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/service/users.service';
import { ROLS } from 'src/constants/Rols';
import { Request } from 'express';
import { useToken } from 'src/utils/use.token';

@Injectable()
export class UserIdGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const id = this.reflector.get<string>(USER_ID_KEY, context.getHandler());
    const roles = this.reflector.get<Array<keyof typeof ROLS>>(
      ROLES_KEY,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest<Request>();
    const { roleUser, idUser } = req;
    const idCompare = req.params.id;
    console.log(idUser);
    if (roleUser === ROLS.ADMIN) {
      return true;
    }
    if (idUser && idCompare) {
      if (idCompare === idUser) {
        return true;
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    }

    return true;
  }
}
