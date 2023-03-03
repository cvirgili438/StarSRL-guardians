

//NodeJS.ProcessEnv

declare namespace NodeJS {
    interface ProcessEnv {
        PORT:number
        DB_HOST:string
        DB_USER:string
        DB_PORT:number
        DB_PASSWORD:number
        DB_NAME:string
        HASH_SALT:number
      
    }
}

