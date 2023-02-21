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
    @IsString()
    address:string;
}