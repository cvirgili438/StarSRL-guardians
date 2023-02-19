import {IsNotEmpty,IsString, IsOptional, IsEnum} from "class-validator";
import { StatesARG } from "src/constants/states";



export class workPlacesDTO {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    city:string;
    @IsNotEmpty()
    @IsEnum(StatesARG)
    state:StatesARG;
    @IsNotEmpty()
    @IsString()
    address:string;
}

export class updateWorkPlacesDTO {
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsString()
    city:string;
    @IsOptional()
    @IsEnum(StatesARG)
    state:StatesARG;
    @IsOptional()
    @IsString()
    address:string;
}