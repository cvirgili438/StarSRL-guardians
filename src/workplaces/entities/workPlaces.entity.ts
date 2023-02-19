import { BaseEntity } from "../../config/base.entity";
import { IWorkPlaces } from "../../interface/workPlaces.interface";
// import { UsersProjectsEntity } from "../../users/entities/usersProject.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { WorkScheduleEntity } from "../../work-schedule/entities/workSchedule.entity";
import { StatesARG } from "src/constants/states";

@Entity({name:'workPlaces'})
export class WorkPlacesEntity extends BaseEntity implements IWorkPlaces{
    @Column()
    name:string;
    @Column()
    city:string;
    @Column({type:"enum",enum:StatesARG})
    state: StatesARG;
    @Column()
    address: string;
    // @OneToMany(()=>UsersProjectsEntity,(project)=>project.project)
    // usersIncludes:UsersProjectsEntity[]
    @OneToMany(()=>WorkScheduleEntity,(workSchedule)=>workSchedule.workPlace)
    workSchedules: WorkScheduleEntity[]

}