import { Module } from '@nestjs/common';

import { UsersService } from './service/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { WorkScheduleEntity } from 'src/work-schedule/entities/workSchedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      WorkScheduleEntity
    ])
  ]
  ,
  providers: [ UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
