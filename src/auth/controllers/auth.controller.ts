import { Controller,Post,Body,UnauthorizedException } from '@nestjs/common';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}
    @Post('login')
    async login (@Body() body: AuthBody){
        const userValidate = await this.authService.validateUser(body.username,body.password)
        if(!userValidate){
            throw new UnauthorizedException('Data not valid')
        }
        const jwt = await this.authService.generateJWT(userValidate)
        return jwt
    }

}
