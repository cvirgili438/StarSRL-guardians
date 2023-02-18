import { Module } from '@nestjs/common';
import { WorkPlacesService } from './service/work-places.service';
import { WorkPlacesController } from './controllers/work-places.controller';

@Module({
  providers: [WorkPlacesService],
  controllers: [WorkPlacesController]
})
export class WorkPlacesModule {}
