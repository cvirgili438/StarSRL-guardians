import { Module } from '@nestjs/common';
import { WorkPlacesService } from './service/work-places.service';
import { WorkPlacesController } from './controllers/work-places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkPlacesEntity } from './entities/workPlaces.entity';
import { UsersService } from 'src/users/service/users.service';
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkScheduleService } from 'src/work-schedule/service/work-schedule.service';
import { WorkScheduleEntity } from 'src/work-schedule/entities/workSchedule.entity';
import { StatesEntity } from 'src/states/entities/states.entity';

@Module({
  imports:[
   TypeOrmModule.forFeature([
    WorkPlacesEntity,
    UserEntity,
    WorkScheduleEntity,
    StatesEntity
   ])
  ]
  ,
  providers: [WorkPlacesService,UsersService],
  controllers: [WorkPlacesController]
})
export class WorkPlacesModule {}
