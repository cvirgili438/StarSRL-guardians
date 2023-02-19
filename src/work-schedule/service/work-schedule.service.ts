import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
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
            const workSchedule : WorkScheduleEntity = await this.workScheduleRepository.create(body)
            if(!workSchedule){
                throw new ErrorManager({
                    type:'NOT_IMPLEMENTED',
                    message:'Cannot create a Schedule'
                })
            }
            else return workSchedule
        } catch (error) {
            throw new ErrorManager.createSignatureError(error.message)
        }
    }
    public async findAllSchedule():Promise <WorkScheduleEntity[]>{
        try {
            const schedules :WorkScheduleEntity[]= await this.workScheduleRepository.find()
            if(schedules.length === 0 ){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'Cannot found any schedule'
                })
            }
            else return schedules
        } catch (error) {
            throw new ErrorManager.createSignatureError(error.message);
            
        }
    }
    public async findSchedulesOfUser(id:string):Promise<WorkScheduleEntity[] | undefined>{
        try {
            const schedules = await this.workScheduleRepository.createQueryBuilder('schedules')
            .leftJoinAndSelect("schedules.user","user")
            .where("user.id= :id",{id})
            .getMany()
            if(schedules.length === 0 ){
                throw new ErrorManager({
                    type:'BAD_REQUEST',message:`Cannot find the users id =${id} Schedules `
                })
            }
            else return schedules
        } catch (error) {
            throw new ErrorManager.createSignatureError(error.message);
            
        }
    }
}
