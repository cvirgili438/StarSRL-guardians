import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Put, Query } from '@nestjs/common/decorators';
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
import { ApiTags, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Month } from 'src/constants/schedule.enum';

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
  @ApiParam({
    name: 'id',
    description: 'UserID',
  })
  @ApiQuery({
    name: 'month',
    description: 'Month',
  })
  @ApiQuery({
    name: 'year',
    description: 'Year',
  })
  @Roles('ADMIN', 'SUPERVISOR', 'USER')
  @Get('/calendar/:id')
  public async getCalendar(
    @Param('id') id: string,
    @Query('month') month: Month,
    @Query('year') year: number,
  ) {
    const body: GetFilterScheduleDTO = {
      month,
      year,
    };
    return await this.workSchedulesServices.getFilterSchedule(body, id);
  }
}
