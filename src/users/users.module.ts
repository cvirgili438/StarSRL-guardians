import { Module } from '@nestjs/common';

import { UsersService } from './service/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { WorkScheduleEntity } from 'src/work-schedule/entities/workSchedule.entity';
import { StatesEntity } from 'src/states/entities/states.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      WorkScheduleEntity,
      StatesEntity
    ])
  ]
  ,
  providers: [ UsersService],
  controllers: [UsersController],
  exports:[UsersService, TypeOrmModule]
})
export class UsersModule {}
