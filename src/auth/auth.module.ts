import { Global, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';


@Global()
@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
