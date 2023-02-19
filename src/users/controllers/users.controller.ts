import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO, UserToScheduleDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}
    @Post('register')
    public async registerUser(@Body() body : UserDTO){
        return await this.userService.createUser(body)
    }
    @Post('add-Schedule')
    public async addSchedule(@Body() body :UserToScheduleDTO){
        return await this.userService.relationToSchedule(body)
    }
    @Get('all')
    public async findAllUsers(){
        return await this.userService.findUsers()
    }
    @Get(':id')
    public async findUserById(@Param('id') id : string){
        return await this.userService.findUserById(id)
    }
    @Put('edit/:id')
    public async updateUser(@Param('id') id:string,@Body() body:UserUpdateDTO){
        return await this.userService.updateUser(body,id)
    }
}
