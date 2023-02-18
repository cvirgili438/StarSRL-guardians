import { HttpException, HttpStatus } from "@nestjs/common";


export class ErrorManager extends Error {
        constructor({type,messege}:{type: keyof typeof HttpStatus,messege:string}){
            super(`${type} :: ${messege}`)
        }
        public static createSignatureError(message:string){
            const name = message.split(' :: ')[0]
            if(name){
                throw new HttpException(message, HttpStatus[name])
            }
            else throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
}