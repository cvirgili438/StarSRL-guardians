import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
//test 
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.env`,
      isGlobal:true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsersModule,
    ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
