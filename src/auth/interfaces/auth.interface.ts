import { ROLS } from "src/constants/Rols";

export interface PayloadToken{
    sub:string;
    role: ROLS
}
export interface AuthBody {
    username:string,
    password:string
}