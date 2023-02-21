import { Module } from '@nestjs/common';
import { StatesService } from './services/states.service';
import { StatesController } from './controllers/states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesEntity } from './entities/states.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      StatesEntity
    ])
  ]
  ,
  providers: [StatesService],
  controllers: [StatesController]
})
export class StatesModule {}
