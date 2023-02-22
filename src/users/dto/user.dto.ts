import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ROLS } from "src/constants/Rols";
import { StatesEntity } from "src/states/entities/states.entity";
import { WorkScheduleEntity } from "src/work-schedule/entities/workSchedule.entity";
import { UserEntity } from "../entities/users.entity";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @IsNotEmpty()
    @IsString()
    lastName:string;
    @IsNotEmpty()
    @IsNumber()
    age:number;
    @IsNotEmpty()
    @IsString()
    email:string;
    @IsNotEmpty()
    @IsString() 
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsNotEmpty()
    @IsEnum(ROLS)
    role:ROLS;
}
export class UserUpdateDTO {
    @IsOptional()
    @IsString()
    firstName:string;
    @IsNotEmpty()
    @IsOptional()
    lastName:string;
    @IsOptional()
    @IsNumber()
    age:number;
    @IsOptional()
    @IsString()
    email:string;
    @IsOptional()
    @IsString() 
    username:string;
    @IsOptional()
    @IsString()
    password:string;
    @IsOptional()
    @IsEnum(ROLS)
    role:ROLS;
}
export class UserToScheduleDTO {
    @IsNotEmpty()
    @IsUUID()
    user :UserEntity;
    @IsNotEmpty()
    @IsUUID()
    workSchedules :WorkScheduleEntity;
    

}
export class UserCreateDTO {
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @IsNotEmpty()
    @IsString()
    lastName:string;
    @IsNotEmpty()
    @IsNumber()
    age:number;
    @IsNotEmpty()
    @IsString()
    city:string
    @IsNotEmpty()
    @IsString()
    email:string;
    @IsNotEmpty()
    @IsString()
    address:string
    @IsNotEmpty()
    @IsNumber()
    dni:number
    @IsNotEmpty()
    @IsString() 
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsNotEmpty()
    @IsEnum(ROLS)
    role:ROLS;
    @IsNotEmpty()
    @IsUUID()
    state :StatesEntity
}