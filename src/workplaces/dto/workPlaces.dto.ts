import {IsNotEmpty,IsString } from "class-validator";



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