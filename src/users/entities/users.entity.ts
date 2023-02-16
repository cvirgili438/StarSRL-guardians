import { BaseEntity } from "../../config/base.entity";
import { ROLS } from "../../constants/Rols";
import { IUser } from "../../interface/user.interface";
import { Column, Entity, OneToMany } from "typeorm";
// import { UsersProjectsEntity } from "./usersProject.entity";

@Entity({name:'users'})
export class UserEntity extends BaseEntity implements IUser{
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column()
    age:number;
    @Column({unique:true})
    email:string;
    @Column({unique:true})
    username:string;
    @Column()
    password:string;
    @Column({type:'enum',enum:ROLS})
    role:ROLS;
    // @OneToMany(()=> UsersProjectsEntity, (userProjects)=>userProjects.user)
    // projectsIncludes:UsersProjectsEntity[]

}