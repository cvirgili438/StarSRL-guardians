import {IsNotEmpty,IsString, IsOptional, IsEnum,IsUUID} from "class-validator";
import { StatesARG } from "src/constants/states";
import { StatesEntity } from "src/states/entities/states.entity";



export class workPlacesDTO {
    @IsNotEmpty()
    @IsUUID()
    state:StatesEntity
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    city:string;   
    @IsNotEmpty()
    @IsString()
    address:string;
}

export class updateWorkPlacesDTO {
    @IsOptional()
    @IsUUID()
    state:StatesEntity
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsString()
    city:string;   
    @IsOptional()
    @IsString()
    address:string;
}
export class ByNameDTO {
    @IsNotEmpty()
    @IsString()
    name:string
}