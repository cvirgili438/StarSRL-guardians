import { CanActivate, ExecutionContext, Injectable,UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from '@nestjs/core'
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key.decorator';
import { ROLS } from 'src/constants/Rols';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(    
    private readonly reflector : Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<Boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    if(isPublic) return true
    const roles = this.reflector.get<Array<keyof typeof ROLS>>(
      ROLES_KEY,
      context.getHandler()
    )
    const admin = this.reflector.get<string>(
      ADMIN_KEY,
      context.getHandler()
      )   
    const req = context.switchToHttp().getRequest<Request>()

    const {roleUser}=req
    if(roles === undefined){
      if(!admin){
        return true
      }else if (admin && roleUser === admin){
        return true
      }
      else {
        throw new UnauthorizedException('You dont have access level to this endpoint')
      }
    }
    const isAuth =roles.some((role) =>role ===roleUser)
    if(!isAuth){
      throw new UnauthorizedException('You dont have access level to this endpoint')
    }
    return true;
  }
}
