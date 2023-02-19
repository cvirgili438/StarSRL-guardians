import { Body, Controller, Post } from '@nestjs/common';
import { workPlacesDTO } from '../dto/workPlaces.dto';
import { WorkPlacesService } from '../service/work-places.service';

@Controller('work-places')
export class WorkPlacesController {
constructor(private readonly workPlacesServices: WorkPlacesService){}

 @Post('create')
    public async createWorkPlace(@Body() body:workPlacesDTO){
        return await this.workPlacesServices.createWorkPlace(body)
    }

}
