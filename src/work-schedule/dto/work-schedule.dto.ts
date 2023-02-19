import {IsNotEmpty, IsNumber, IsString, IsOptional, IsUUID} from 'class-validator'
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';

export class WorkScheduleDTO {
    @IsNotEmpty()
    @IsNumber()
    dayOfWeek: number;
    @IsNotEmpty()
    @IsString()
    startTime: string;
    @IsNotEmpty()
    @IsString()
    endTime:string;
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