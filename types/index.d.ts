

//NodeJS.ProcessEnv

declare namespace NodeJS {
    interface ProcessEnv {
        PORT:number
        DB_HOST:string
        DB_USER:string
        DB_PORT:number
        DB_PASSWORD:number
        DB_NAME:string
      
    }
}

// PORT=3001
// DB_HOST=localhost
// DB_USER=postgres
// DB_PORT=5432
// DB_PASSWORD=34512137
// DB_NAME=nest_star