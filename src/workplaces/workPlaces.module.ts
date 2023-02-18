import { Module } from '@nestjs/common';
import { WorkPlacesService } from './service/work-places.service';
import { WorkPlacesController } from './controllers/work-places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkPlacesEntity } from './entities/workPlaces.entity';

@Module({
  imports:[
   TypeOrmModule.forFeature([
    WorkPlacesEntity
   ])
  ]
  ,
  providers: [WorkPlacesService],
  controllers: [WorkPlacesController]
})
export class WorkPlacesModule {}
