import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StateDTO } from '../dto/state.dto';
import { StatesService } from '../services/states.service';

@Controller('states')
export class StatesController {
    constructor(private readonly statesServices:StatesService){}
    @Post('create')
    public async createState(@Body() body : StateDTO){
        return await this.statesServices.createState(body)
    }
    @Get('all')
    public async getStates(){
        return await this.statesServices.getStates()
    }
    @Get(':name')
    public async getStateByName(@Param('name') name:string){
        return await this.statesServices.getStateByName(name)
    }
}
