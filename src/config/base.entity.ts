import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";


export abstract class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @CreateDateColumn({
        type:'timestamp',
        name:'created_at'
    })
    createAt:Date; 
    @CreateDateColumn({
        type:'timestamp',
        name:'update_at'
    })
    updateAt: Date;
}