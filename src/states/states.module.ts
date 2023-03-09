import { Module } from '@nestjs/common';
import { StatesService } from './services/states.service';
import { StatesController } from './controllers/states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesEntity } from './entities/states.entity';
import { UsersService } from 'src/users/service/users.service';
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkScheduleEntity } from 'src/work-schedule/entities/workSchedule.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      StatesEntity,
      UserEntity,
      WorkScheduleEntity
    ])
  ]
  ,
  providers: [StatesService,UsersService],
  controllers: [StatesController]
})
export class StatesModule {}
