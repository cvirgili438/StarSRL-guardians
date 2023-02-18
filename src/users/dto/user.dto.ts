import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ROLS } from "src/constants/Rols";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    firstName:string;
    @IsNotEmpty()
    @IsString()
    lastName:string;
    @IsNotEmpty()
    @IsNumber()
    age:number;
    @IsNotEmpty()
    @IsString()
    email:string;
    @IsNotEmpty()
    @IsString() 
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsNotEmpty()
    @IsEnum(ROLS)
    role:ROLS;
}
export class UserUpdateDTO {
    @IsOptional()
    @IsString()
    firstName:string;
    @IsNotEmpty()
    @IsOptional()
    lastName:string;
    @IsOptional()
    @IsNumber()
    age:number;
    @IsOptional()
    @IsString()
    email:string;
    @IsOptional()
    @IsString() 
    username:string;
    @IsOptional()
    @IsString()
    password:string;
    @IsOptional()
    @IsEnum(ROLS)
    role:ROLS;
}