import { Module } from '@nestjs/common';
import { WorkScheduleService } from './service/work-schedule.service';
import { WorkScheduleController } from './controllers/work-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkScheduleEntity } from './entities/workSchedule.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';
import { UsersService } from 'src/users/service/users.service';
import { StatesEntity } from 'src/states/entities/states.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkScheduleEntity,
      UserEntity,
      WorkPlacesEntity,
      StatesEntity,
    ]),
  ],
  providers: [WorkScheduleService, UsersService],
  controllers: [WorkScheduleController],
})
export class WorkScheduleModule {}
