import { Module } from '@nestjs/common';
import { WorkScheduleService } from './service/work-schedule.service';
import { WorkScheduleController } from './controllers/work-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkScheduleEntity } from './entities/workSchedule.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([WorkScheduleEntity])
  ],
  providers: [WorkScheduleService],
  controllers: [WorkScheduleController]
})
export class WorkScheduleModule {}
