import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserCreateDTO, UserDTO, UserToScheduleDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userService : UsersService){}
    @PublicAccess()
    @Post('register')
    public async registerUser(@Body() body : UserCreateDTO){
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
    @PublicAccess()
    @Get(':id')
    public async findUserById(@Param('id') id : string){
        return await this.userService.findUserById(id)
    }
    @Put('edit/:id')
    public async updateUser(@Param('id') id:string,@Body() body:UserUpdateDTO){
        return await this.userService.updateUser(body,id)
    }
    @Delete('delete/:id')
    public async deleteUser(@Param('id') id:string){
        return await this.userService.deleteUser(id)
    }
}
