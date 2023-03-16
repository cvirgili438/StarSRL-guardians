import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID,IsEmail, isNotEmpty } from "class-validator";
import { ROLS } from "src/constants/Rols";
import { StatesEntity } from "src/states/entities/states.entity";
import { WorkScheduleEntity } from "src/work-schedule/entities/workSchedule.entity";
import { UserEntity } from "../entities/users.entity";
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age:number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    username:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLS)
    role:ROLS;
}
export class UserUpdateDTO {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    firstName:string;
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsOptional()
    lastName:string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    age:number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsEmail()
    email:string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString() 
    username:string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password:string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(ROLS)
    role:ROLS;
}
export class UserToScheduleDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    user :UserEntity;
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    workSchedules :WorkScheduleEntity;
    

}
export class UserCreateDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age:number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city:string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address:string
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    dni:number
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLS)
    role:ROLS;
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    state :StatesEntity
}

export class UUIDUser {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    user:UserEntity
}