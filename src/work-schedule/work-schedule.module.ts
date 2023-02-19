import { Module } from '@nestjs/common';
import { WorkScheduleService } from './service/work-schedule.service';
import { WorkScheduleController } from './controllers/work-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkScheduleEntity } from './entities/workSchedule.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      WorkScheduleEntity,
      UserEntity,
      WorkPlacesEntity
    ])
  ],
  providers: [WorkScheduleService],
  controllers: [WorkScheduleController]
})
export class WorkScheduleModule {}
