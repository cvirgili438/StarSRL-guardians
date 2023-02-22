import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { start } from 'repl';
import { UserEntity } from 'src/users/entities/users.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';
import { Repository } from 'typeorm';
import { UserSchedulePlaceDTO, WorkScheduleDTO } from '../dto/work-schedule.dto';
import { WorkScheduleEntity } from '../entities/workSchedule.entity';

@Injectable()
export class WorkScheduleService {

    constructor(
        @InjectRepository(WorkScheduleEntity)
        private readonly workScheduleRepository: Repository<WorkScheduleEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        @InjectRepository(WorkPlacesEntity)
        private readonly workPlaceRepository : Repository<WorkPlacesEntity>
    )
    {}
    public async createSchedule(body: WorkScheduleDTO):Promise<WorkScheduleEntity>{
        try {
            const workSchedule : WorkScheduleEntity = await this.workScheduleRepository.create(body)
            console.log(workSchedule)
            if(!workSchedule){
                throw new ErrorManager({
                    type:'NOT_IMPLEMENTED',
                    message:'Cannot create a Schedule'
                })
            }
            else return workSchedule
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)
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
            throw  ErrorManager.createSignatureError(error.message);
            
        }
    }
    public async findSchedulesOfUser(id:string):Promise<WorkScheduleEntity[]>{
        try {
            const schedules = await this.workScheduleRepository.createQueryBuilder('schedules') 
            .where("user.id = :id",{id})
            .leftJoinAndSelect("schedules.user","user")
            .leftJoinAndSelect('user.workSchedules','workSchedules')
            .getMany()
            if(schedules.length === 0 ){
                throw new ErrorManager({
                    type:'BAD_REQUEST',message:`Cannot find the users id =${id} Schedules `
                })
            }
            else return schedules
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message);
            
        }
    }

    public async userSchedulePlace(body: UserSchedulePlaceDTO){
        let {workPlace,user,dayOfWeek,startTime,endTime}=body        

        try {
            if(!workPlace || !user || !dayOfWeek || !startTime || !endTime){
            throw new ErrorManager({
                type:'NO_CONTENT',
                message:'Missing parameters'
            })
        }
        return await this.workScheduleRepository.save(body)
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
