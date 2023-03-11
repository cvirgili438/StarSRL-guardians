<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Routes For this API 

 - Before all, the routes are already protected, so if you dont want to fight against the authentications, you must enter in the controllers (User, Schedules, States and WorkPlaces) and comment the decorartor which called "@UseGuard". 
 Otherwhise, you need to get a token by the route localhost:3001/api/auth/login ( you can use username and password or email and passwork, choose your prefer)
 then, in the most of the routes, you will need a header called access_token, with the token you get from the authentication. 
 You can see if the route are protected or no in the controllers, the routes which have the decorartor "@PublicAccess", you don't need a access token.

 - Users Routes 
 ```typescript

 //First all, the ENUM ROLS is =  USER='USER',ADMIN='ADMIN',SUPERVISOR='SUPERVISOR'
    
    
 // POST localhost:3001/api/users/register
 // you need to send a body, which is the follow
 let body = {
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
    city:string
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @IsString()
    address:string
    @IsNotEmpty()
    @IsNumber()
    dni:number
    @IsNotEmpty()
    @IsString() 
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsNotEmpty()
    @IsEnum(ROLS)
    role:ROLS;
    @IsNotEmpty()
    @IsUUID()
    state :StatesEntity
 }

  // POST localhost:3001/api/users/add-Schedule
  //  attach an existing user's schedules to an existing user
  let body= {
    @IsNotEmpty()
    @IsUUID()
    user :UserEntity;
    @IsNotEmpty()
    @IsUUID()
    workSchedules :WorkScheduleEntity;
  }
  // GET localhost:3001/api/users/all
  //you will get all of the users

  //GET  localhost:3001/api/users/:id
  //User by ID 

  //PUT localhost:3001/api/users/edit/:id
  //You need a id in params and a body,
  let body = {
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
    @IsEmail()
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
  //DELETE localhost:3001/api/users/delete/:id
  // if the response affected > 0, the delete is done

  // 


```
- Schedules Routes 
```typescript

//first all Month enum is 
enum Month {
    January = "January",
    February = "February",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December"
}
//POST  localhost:3001/api/work-schedule/create
//without user and place
let body = {
   @IsNotEmpty()
    @IsEnum(Month)
    month:Month  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(31)
    dayOfWeek: number;
    @IsNotEmpty()
    @IsString()
    startTime: string;
    @IsNotEmpty()
    @IsString()
    endTime:string;
    @IsOptional()
    @IsString()
    startWorking:string;
    @IsOptional()
    @IsString()
    endWorking:string
}

//POST  localhost:3001/api/work-schedule/unit-all

//this post is used if you already have a user and a workplaced 

let body = {
     @IsNotEmpty()
    @IsEnum(Month)
    month:Month  
    @IsNotEmpty()
    @IsUUID()
    workPlace: WorkPlacesEntity
    @IsNotEmpty()
    @IsUUID()
    user:UserEntity
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(31)    
    dayOfWeek:number
    @IsNotEmpty()
    @IsString()
    startTime:string
    @IsNotEmpty()
    @IsString()
    endTime:string
    @IsOptional()
    @IsString()
    startWorking:string;
    @IsOptional()
    @IsString()
    endWorking:string
}

// GET localhost:3001/api/work-schedule/:id
// Get users schedules. 

```
- States Routes
```typescript 
//POST localhost:3001/api/states/create 
let body = {
  name:string
}
// GET all states  localhost:3001/api/states/all

//GET State by Name localhost:3001/api/state/:name

 

```
- Work Places Routes :
```typescript
//POST localhost:3001/api/work-places/create
let body ={
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

// GET localhost:3001/api/work-places/all
 //  get all places to work 
 

 //GET localhost:3001/api/work-places/name
 // get a name by body 
 let body = {
  @IsNotEmpty()
  @IsString()
  name:string
 }

 //PUT localhost:3001/api/work-places/:id
 // this endpoint needs a id in params and the next body 
 let body = {
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
```
