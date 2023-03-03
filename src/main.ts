import { ConfigService } from '@nestjs/config/dist';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { CORS } from './constants';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'))

  const configService = app.get(ConfigService)
  app.enableCors(CORS)
  app.setGlobalPrefix('api')
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  
  await app.listen(configService.get('PORT'), ()=>{
    console.log(`Server is running on port ${configService.get('PORT')}`)
    
  });
}
bootstrap();
