import {IsNotEmpty,IsString, IsOptional } from "class-validator";



export class workPlacesDTO {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    city:string;
    @IsNotEmpty()
    @IsString()
    state:string;
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
    state:string;
    @IsOptional()
    @IsString()
    address:string;
}