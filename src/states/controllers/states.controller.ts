import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { StateDTO } from '../dto/state.dto';
import { StatesService } from '../services/states.service';

@Controller('states')
@UseGuards(AuthGuard,RolesGuard)
export class StatesController {
    constructor(private readonly statesServices:StatesService){}
    @Roles('ADMIN','SUPERVISOR')
    @Post('create')
    public async createState(@Body() body : StateDTO){
        return await this.statesServices.createState(body)
    }
    @PublicAccess()
    @Get('all')
    public async getStates(){
        return await this.statesServices.getStates()
    }
    @PublicAccess()
    @Get(':name')
    public async getStateByName(@Param('name') name:string){
        return await this.statesServices.getStateByName(name)
    }
}
