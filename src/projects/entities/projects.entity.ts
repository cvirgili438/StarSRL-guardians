import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interface/projects.interface";
// import { UsersProjectsEntity } from "../../users/entities/usersProject.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({name:'workPlaces'})
export class ProjectEntity extends BaseEntity implements IProject{
    @Column()
    name:string;
    @Column()
    city:string;
    @Column()
    state: string;
    @Column()
    address: string;
    // @OneToMany(()=>UsersProjectsEntity,(project)=>project.project)
    // usersIncludes:UsersProjectsEntity[]

}