import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkScheduleDTO } from '../dto/work-schedule.dto';
import { WorkScheduleService } from '../service/work-schedule.service';

@Controller('work-schedule')
export class WorkScheduleController {
constructor(private readonly workSchedulesServices : WorkScheduleService){}
@Post('create')
public async createSchedule (@Body() body: WorkScheduleDTO){
    return await this.workSchedulesServices.createSchedule(body)

}
@Get(':id')
public async userSchedules (@Param('id') id: string){
    return await this.workSchedulesServices.findSchedulesOfUser(id)
}

}
