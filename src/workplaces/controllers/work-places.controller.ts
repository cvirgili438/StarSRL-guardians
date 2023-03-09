import { Body, Controller, Get, Param, Post, Put,UseGuards } from '@nestjs/common';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ByNameDTO, updateWorkPlacesDTO, workPlacesDTO } from '../dto/workPlaces.dto';
import { WorkPlacesService } from '../service/work-places.service';

@Controller('work-places')
@UseGuards(AuthGuard,RolesGuard)
export class WorkPlacesController {
constructor(private readonly workPlacesServices: WorkPlacesService){}
    @Roles('ADMIN')
    @Post('create')
        public async createWorkPlace(@Body() body:workPlacesDTO){
            return await this.workPlacesServices.createWorkPlace(body)
        }
    @PublicAccess()
    @Get('all')
        public async getAllWorkPlaces(){
            return await this.workPlacesServices.findWorkPlaces()
        }
    @PublicAccess()
    @Get('/name/')
        public async getPlaceByCity(@Body() body:ByNameDTO){
            return await this.workPlacesServices.getByName(body)
        }
    @Roles('ADMIN')
    @Put(':id')
        public async changePlace(@Body()body :updateWorkPlacesDTO, @Param('id') id:string){
            return await this.workPlacesServices.updateWorkPlace(body,id)
    }

}
