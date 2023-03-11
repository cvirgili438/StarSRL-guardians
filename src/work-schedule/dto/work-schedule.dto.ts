import {IsNotEmpty, IsNumber, IsString, IsOptional, IsUUID,IsEnum,Min,Max} from 'class-validator'
import { Month } from 'src/constants/schedule.enum';
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { WorkScheduleEntity } from '../entities/workSchedule.entity';

export class WorkScheduleDTO {
    @IsNotEmpty()
    @IsEnum(Month)
    month:Month  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(31)
    dayOfWeek: number;
    @IsNotEmpty()
    @IsString()
    startTime: string;
    @IsNotEmpty()
    @IsString()
    endTime:string;
    @IsOptional()
    @IsString()
    startWorking:string;
    @IsOptional()
    @IsString()
    endWorking:string
    

}

export class UpdateWorkScheduleDTO {
    @IsOptional()
    @IsNumber()
    dayOfWeek: number;
    @IsOptional()
    @IsString()
    startTime: string;
    @IsOptional()
    @IsString()
    endTime:string;
}

export class UserSchedulePlaceDTO {
    @IsNotEmpty()
    @IsEnum(Month)
    month:Month  
    @IsNotEmpty()
    @IsUUID()
    workPlace: WorkPlacesEntity
    @IsNotEmpty()
    @IsUUID()
    user:UserEntity
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(31)    
    dayOfWeek:number
    @IsNotEmpty()
    @IsString()
    startTime:string
    @IsNotEmpty()
    @IsString()
    endTime:string
    @IsOptional()
    @IsString()
    startWorking:string;
    @IsOptional()
    @IsString()
    endWorking:string
}
export class SchedulePutDTO {
    @IsNotEmpty()
    @IsUUID()
    ScheduleID:WorkScheduleEntity
    @IsOptional()
    @IsEnum(Month)
    month:Month  
    @IsOptional()
    @IsUUID()
    workPlace: WorkPlacesEntity
    @IsOptional()
    @IsUUID()
    user:UserEntity
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(31)    
    dayOfWeek:number
    @IsOptional()
    @IsString()
    startTime:string
    @IsOptional()
    @IsString()
    endTime:string  
    @BeforeInsert()
    @BeforeUpdate()
    validateDayOfMonth:()=>void
}
export class StartOrEndingWorkDTO{
    @IsOptional()
    @IsString()
    startWorking:string
    @IsOptional()
    @IsString()
    endWorking:string
    @BeforeInsert()
    @BeforeUpdate()
    validateDayOfMonth:()=>void
    
}