import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  GetFilterScheduleDTO,
  SchedulePutDTO,
  StartOrEndingWorkDTO,
  UserSchedulePlaceDTO,
  WorkScheduleDTO,
} from '../dto/work-schedule.dto';
import { WorkScheduleService } from '../service/work-schedule.service';
import { ApiTags, ApiHeader, ApiParam } from '@nestjs/swagger';

@ApiTags('Work Schedules')
@Controller('work-schedule')
@UseGuards(AuthGuard, RolesGuard)
export class WorkScheduleController {
  constructor(private readonly workSchedulesServices: WorkScheduleService) {}
  @ApiHeader({
    name: 'access_token',
  })
  @Roles('SUPERVISOR', 'ADMIN')
  @Post('create')
  public async createSchedule(@Body() body: WorkScheduleDTO) {
    const work = await this.workSchedulesServices.createSchedule(body);
    return work;
  }
  @ApiHeader({
    name: 'access_token',
  })
  @Roles('SUPERVISOR', 'ADMIN')
  @Post('unit-all')
  public async allUnit(@Body() body: UserSchedulePlaceDTO) {
    return await this.workSchedulesServices.userSchedulePlace(body);
  }
  @PublicAccess()
  @Get('/')
  public async getSchedules() {
    return await this.workSchedulesServices.findAllSchedule();
  }
  @ApiParam({
    name: 'id',
    description: 'User ID ',
  })
  @PublicAccess()
  @Get(':id')
  public async userSchedules(@Param('id') id: string) {
    return await this.workSchedulesServices.findSchedulesOfUser(id);
  }
  @ApiHeader({
    name: 'access_token',
  })
  @Roles('ADMIN', 'SUPERVISOR')
  @Put('/Put')
  public async putSchedule(@Body() body: SchedulePutDTO) {
    return await this.workSchedulesServices.putSchedule(body);
  }
  @ApiHeader({
    name: 'access_token',
  })
  @Roles('USER')
  @Put(':id')
  public async startWorking(
    @Param('id') id: string,
    @Body() body: StartOrEndingWorkDTO,
  ) {
    return await this.workSchedulesServices.putWorking(id, body);
  }
  @ApiHeader({
    name: 'access_token',
  })
  @Roles('ADMIN', 'SUPERVISOR', 'USER')
  @Post('/calendar/:id')
  public async getCalendar(
    @Body() body: GetFilterScheduleDTO,
    @Param('id') id: string,
  ) {
    return await this.workSchedulesServices.getFilterSchedule(body, id);
  }
}
