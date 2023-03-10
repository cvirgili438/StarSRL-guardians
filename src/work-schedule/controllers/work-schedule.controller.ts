import { Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserSchedulePlaceDTO, WorkScheduleDTO } from '../dto/work-schedule.dto';
import { WorkScheduleService } from '../service/work-schedule.service';

@Controller('work-schedule')
@UseGuards(AuthGuard,RolesGuard)
export class WorkScheduleController {
constructor(private readonly workSchedulesServices : WorkScheduleService){}
@Roles('SUPERVISOR','ADMIN')
@Post('create')
public async createSchedule (@Body() body: WorkScheduleDTO){
    const work = await this.workSchedulesServices.createSchedule(body)    
    return work
}
@Roles('SUPERVISOR','ADMIN')
@Post('unit-all')
public async allUnit(@Body() body: UserSchedulePlaceDTO){
    return await this.workSchedulesServices.userSchedulePlace(body)
}
@PublicAccess()
@Get('/')
public async getSchedules(){
    return await this.workSchedulesServices.findAllSchedule()
}
@PublicAccess()
@Get(':id')
public async userSchedules (@Param('id') id: string){
    return await this.workSchedulesServices.findSchedulesOfUser(id)
}

}
