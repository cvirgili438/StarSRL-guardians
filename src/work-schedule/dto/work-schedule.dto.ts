import {IsNotEmpty, IsNumber, IsString, IsOptional, IsUUID,IsEnum} from 'class-validator'
import { Month } from 'src/constants/schedule.enum';
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';

export class WorkScheduleDTO {
    @IsNotEmpty()
    @IsEnum(Month)
    month:Month  
    @IsNotEmpty()
    @IsNumber()
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
    @IsUUID()
    workPlace: WorkPlacesEntity
    @IsNotEmpty()
    @IsUUID()
    user:UserEntity
}