import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatesEntity } from 'src/states/entities/states.entity';
import * as bcrypt from 'bcrypt'
import { ErrorManager } from 'src/utils/error.manager';
import { WorkScheduleEntity } from 'src/work-schedule/entities/workSchedule.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserCreateDTO, UserDTO, UserToScheduleDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WorkScheduleEntity)
    private readonly WorkScheduleRepository : Repository<WorkScheduleEntity>,
    @InjectRepository(StatesEntity)
    private readonly stateRepository:Repository<StatesEntity>
  ) {
   
  }

  public async createUser(body: UserCreateDTO): Promise<UserEntity> {
    try {
      let {state} = body
      const user : UserEntity = await this.userRepository.create(body);
      const newPassword = await bcrypt.hash(user.password,+process.env.HASH_SALT) 
      user.password = newPassword
      if(user && state){
        return await this.userRepository.save(user)
      }else throw new ErrorManager({
        type:'BAD_REQUEST',
        message:'cannot create a users for no reason'
      })
       
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message)
    }
  }

  public async findUsers(): Promise<UserEntity[]> {
    try {
      const users : UserEntity[] = await this.userRepository.createQueryBuilder('users')
      .leftJoinAndSelect("users.state","state")       
      .getMany()
      if(users.length === 0 ){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'cannot find users'
        })
      }
      return  users
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message)
    }
  }

  public async findUserById(id: string): Promise<UserEntity> {
    try {
      const user :UserEntity = await this.userRepository  .createQueryBuilder('users')
        .where({ id:id })
        .leftJoinAndSelect("users.state","state")   
        .getOne();
      if(!user){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'The user cannot'
        })
      }
      return user 
      
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message)
    }
  }

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type:'CONFLICT',
          message:'Cannot update the user'
        })
      }
      return user;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message)
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete({id:id});
      if (user.affected === 0) {
        throw new ErrorManager({
          type:'INTERNAL_SERVER_ERROR',
          message:'Cannot delete de user'
        })
      }
      return user;
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message)
    }
  }
  public async userSchedule(id : string):Promise<UserEntity | undefined>{

    try {
      const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect("users.workSchedules", "schedules")
      .where("users.id = :id",{id:id})
      .getOne()
      if(!user){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'Cannot get Schedules '
        })
      }
      return user
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message)
      
    }
  }

  public async relationToSchedule (body :UserToScheduleDTO ){
    try {
      return await this.WorkScheduleRepository.save(body)
    } catch (error) {
      throw  ErrorManager.createSignatureError(error.message)
    }
  }
}