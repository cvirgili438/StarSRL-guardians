import {IsNotEmpty, IsNumber, IsString, IsOptional} from 'class-validator'

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