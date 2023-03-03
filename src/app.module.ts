import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { WorkPlacesModule } from './workplaces/workPlaces.module';
import { WorkScheduleModule } from './work-schedule/work-schedule.module';
import { StatesModule } from './states/states.module';
import { AuthModule } from './auth/auth.module';
//test 
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.env`,
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsersModule,
    WorkPlacesModule,
    WorkScheduleModule,
    StatesModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
