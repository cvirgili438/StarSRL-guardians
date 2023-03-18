import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Month } from 'src/constants/schedule.enum';
import { UserEntity } from 'src/users/entities/users.entity';
import { ErrorManager } from 'src/utils/error.manager';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';
import { Repository } from 'typeorm';
import { SchedulePutDTO, StartOrEndingWorkDTO, UserSchedulePlaceDTO, WorkScheduleDTO } from '../dto/work-schedule.dto';
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

    public async userSchedulePlace(body: UserSchedulePlaceDTO):Promise<WorkScheduleEntity>{
        let {workPlace,user,dayOfWeek,startTime,endTime,month,year}=body  


        try {
            if(!workPlace || !user || !dayOfWeek || !startTime || !endTime || !month || !year){
            throw new ErrorManager({
                type:'NO_CONTENT',
                message:'Missing parameters'
            })
        }
        let verify: WorkScheduleEntity = await this.workScheduleRepository
          .createQueryBuilder('schedule')
          .where(
            'schedule.workPlace = :workPlace AND schedule.startTime = :startTime AND schedule.endTime = :endTime AND schedule.month = :month AND schedule.dayOfWeek = :dayOfWeek AND schedule.year = :year',
            {
              workPlace: workPlace,
              endTime: endTime,
              startTime: startTime,
              month: month,
              dayOfWeek: dayOfWeek,
              year: year,
            },
          )
          .getOne();
        if(verify){
            throw new ErrorManager({
                type:'AMBIGUOUS',
                message:'The Schedule already exist,please change the exist schedule id '+verify.id
            })
        }
        let verify2 :WorkScheduleEntity[] = await this.workScheduleRepository.createQueryBuilder('schedule')
        .where('schedule.workPlace = :workPlace AND schedule.month = :month AND schedule.dayOfWeek = :dayOfWeek AND schedule.year = :year',
        {
            workPlace:workPlace,
            month:month,
            dayOfWeek:dayOfWeek,
            year: year
        })
        .getMany()
        
        if(verify2.length > 0){            
            let find = verify2.filter(e=>(e.startTime === startTime && e.endTime === endTime))
            let start = verify2.map(e=>+e.startTime.split(':')[0])[0]
            let finish = verify2.map(e=>+e.endTime.split(':')[0])[0]
            let startNew = +startTime.split(':')[0]
            let finishNew = +endTime.split(':')[0]
            if(startNew >= start && startNew < finish ){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:`Other employee is already selected to work this day `
                })
            }
            if(find.length >0){
                throw new ErrorManager({
                    type:'AMBIGUOUS',
                    message:'The Schedule already exist,please change the exist schedule id '+verify.id
                })
            }
            else return await this.workScheduleRepository.save(body)
           
        }
        else return await this.workScheduleRepository.save(body)
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    public async putSchedule(body : SchedulePutDTO):Promise<WorkScheduleEntity>{
        
        try {
            const {ScheduleID,month}=body;
            const newObject =Object.assign({},body)
            delete newObject.ScheduleID
            console.log(ScheduleID)
            if(!ScheduleID || ScheduleID === undefined|| !body){
               throw new ErrorManager({
                type:'BAD_REQUEST',
                message:'Please, send a Schedule ID '
               })                
            }
            if(month && !Object.values(Month).includes(month)){
                throw new ErrorManager({
                    type:'CONFLICT',
                    message:`Please insert a valid Month like a ${Object.keys(Month)}`
                })
            }
            else{ 
                let schedule= await this.workScheduleRepository
                .createQueryBuilder('schedule')
                .where('schedule.id = :id',{id:ScheduleID})
                .getOne();
                schedule={
                    ...schedule,
                    ...newObject
                }
                return this.workScheduleRepository.save(schedule)
            }


        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }

    }
    public async putWorking(id:string,body:StartOrEndingWorkDTO):Promise<WorkScheduleEntity>{
        try {
            const {endWorking,startWorking}=body
            if(!id || !body){
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message:'Id or body is missing',
                })
            }
            let schedule = await this.workScheduleRepository
            .createQueryBuilder('schedule')
            .where('schedule.id = :id',{id:id})
            .getOne()
            if(endWorking && schedule.endWorking){
                throw new ErrorManager({
                    type:'CONFLICT',
                    message:'you cant change your end Working time'
                })
            }
            if(startWorking && schedule.startWorking){
                throw new ErrorManager({
                    type:'CONFLICT',
                    message:'you cant change your start Working time'
                })
            }
            else {
                schedule = {
                    ...schedule,
                    ...body
                }
            }
            return await this.workScheduleRepository.save(schedule)
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }

    }
    public async getFilterSchedule (){

    }
}
