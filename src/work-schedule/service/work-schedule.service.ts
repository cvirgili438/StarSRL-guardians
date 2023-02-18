import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkScheduleDTO } from '../dto/work-schedule.dto';
import { WorkScheduleEntity } from '../entities/workSchedule.entity';

@Injectable()
export class WorkScheduleService {

    constructor(
        @InjectRepository(WorkScheduleEntity)
        private readonly workScheduleRepository: Repository<WorkScheduleEntity>,
    )
    {}
    public async createSchedule(body: WorkScheduleDTO):Promise<WorkScheduleEntity>{
        try {
            return this.workScheduleRepository.create(body)
        } catch (error) {
            throw new Error(error)
        }
    }
    public async findAllSchedule():Promise <WorkScheduleEntity[]>{
        try {
            return this.workScheduleRepository.find()
        } catch (error) {
            throw new Error(error);
            
        }
    }
    public async findSchedulesOfUser(id:string):Promise<WorkScheduleEntity[] | undefined>{
        try {
            const schedules = await this.workScheduleRepository.createQueryBuilder('schedules')
            .leftJoinAndSelect("schedules.user","user")
            .where("user.id= :id",{id})
            .getMany()
            if(schedules.length === 0 )return undefined
            return schedules
        } catch (error) {
            throw new Error(error);
            
        }
    }
}
