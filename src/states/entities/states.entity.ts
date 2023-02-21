import { BaseEntity } from "../../config/base.entity";
import { IStates } from "../../interface/states.interface";
import { UserEntity } from "../../users/entities/users.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { WorkPlacesEntity } from "../../workplaces/entities/workPlaces.entity";


@Entity({name:'states'})
export class StatesEntity extends BaseEntity implements IStates{
    @Column()
    name:string;

    @OneToMany(()=>UserEntity,(users)=>users.state)
    users:UserEntity[]

    @OneToMany(()=>WorkPlacesEntity,(places)=>places.state)
    places:WorkPlacesEntity[]
}