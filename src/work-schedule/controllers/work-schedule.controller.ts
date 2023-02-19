import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserSchedulePlaceDTO, WorkScheduleDTO } from '../dto/work-schedule.dto';
import { WorkScheduleService } from '../service/work-schedule.service';

@Controller('work-schedule')
export class WorkScheduleController {
constructor(private readonly workSchedulesServices : WorkScheduleService){}
@Post('create')
public async createSchedule (@Body() body: WorkScheduleDTO){
    const work = await this.workSchedulesServices.createSchedule(body)    
    return work
}
@Post('unit-all')
public async allUnit(@Body() body: UserSchedulePlaceDTO){
    return await this.workSchedulesServices.userSchedulePlace(body)
}
@Get('/')
public async getSchedules(){
    return await this.workSchedulesServices.findAllSchedule()
}
@Get(':id')
public async userSchedules (@Param('id') id: string){
    return await this.workSchedulesServices.findSchedulesOfUser(id)
}

}
