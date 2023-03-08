import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StateDTO } from '../dto/state.dto';
import { StatesService } from '../services/states.service';

@Controller('states')
@UseGuards(AuthGuard)
export class StatesController {
    constructor(private readonly statesServices:StatesService){}
    @Post('create')
    public async createState(@Body() body : StateDTO){
        return await this.statesServices.createState(body)
    }
    @PublicAccess()
    @Get('all')
    public async getStates(){
        return await this.statesServices.getStates()
    }
    @Get(':name')
    public async getStateByName(@Param('name') name:string){
        return await this.statesServices.getStateByName(name)
    }
}
