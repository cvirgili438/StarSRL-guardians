import { IWorkSchedule } from "../../interface/workSchedule.interface";
import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "../../users/entities/users.entity";
import { WorkPlacesEntity } from "../../workplaces/entities/workPlaces.entity";

@Entity({name:'workSchedule'})
export class WorkScheduleEntity extends BaseEntity implements IWorkSchedule {
    @Column()
    dayOfWeek: number;
    @Column()
    startTime: string;
    @Column()
    endTime:string;
    @ManyToOne(()=>UserEntity,(user)=> user.workSchedules)
    user:UserEntity

    @ManyToOne(()=>WorkPlacesEntity,(workPlaces)=>workPlaces.workSchedules)
    workPlace:WorkPlacesEntity


}