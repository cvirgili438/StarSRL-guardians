import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { idUserDecorator } from 'src/auth/decorators/userID.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserIdGuard } from 'src/auth/guards/user-id.guard';
import {
  UserCreateDTO,
  UserDTO,
  UserToScheduleDTO,
  UserUpdateDTO,
} from '../dto/user.dto';
import { UsersService } from '../service/users.service';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard, UserIdGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserCreateDTO) {
    return await this.userService.createUser(body);
  }
  @ApiHeader({
    name: 'access_token',
  })
  @Post('add-Schedule')
  public async addSchedule(@Body() body: UserToScheduleDTO) {
    return await this.userService.relationToSchedule(body);
  }
  @ApiHeader({
    name: 'access_token',
  })
  @Roles('SUPERVISOR', 'ADMIN')
  @Get('all')
  public async findAllUsers() {
    return await this.userService.findUsers();
  }
  @PublicAccess()
  @Get(':id')
  public async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }
  @idUserDecorator('USERID')
  @ApiHeader({
    name: 'access_token',
  })
  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.userService.updateUser(body, id);
  }
  @ApiHeader({
    name: 'access_token',
  })
  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
