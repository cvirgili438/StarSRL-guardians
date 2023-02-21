import { BaseEntity } from "../../config/base.entity";
import { ROLS } from "../../constants/Rols";
import { IUser } from "../../interface/user.interface";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
// import { UsersProjectsEntity } from "./usersProject.entity";
import { WorkScheduleEntity } from "../../work-schedule/entities/workSchedule.entity";
import { StatesEntity } from "../../states/entities/states.entity";

@Entity({name:'users'})
export class UserEntity extends BaseEntity implements IUser{
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column()
    age:number;
    @Column()
    city: string;
    @Column({unique:true})
    email:string;
    @Column()
    address:string;
    @Column()
    dni: number;
    @Column({unique:true})
    username:string;
    @Column()
    password:string;
    @Column({type:'enum',enum:ROLS})
    role:ROLS;
    
    
    // @OneToMany(()=> UsersProjectsEntity, (userProjects)=>userProjects.user)
    // projectsIncludes:UsersProjectsEntity[]
    @OneToMany(()=>WorkScheduleEntity, (workSchedule)=>workSchedule.user)
    workSchedules:WorkScheduleEntity[]

    @ManyToOne(()=>StatesEntity,(states)=>states.users)
    state:StatesEntity
}