import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { updateWorkPlacesDTO, workPlacesDTO } from '../dto/workPlaces.dto';
import { WorkPlacesEntity } from '../entities/workPlaces.entity';

@Injectable()
export class WorkPlacesService {
    constructor(
        @InjectRepository(WorkPlacesEntity)
        private readonly workPlacesRepository: Repository<WorkPlacesEntity>,
    ){}
    public async createWorkPlace(body : workPlacesDTO): Promise<WorkPlacesEntity>{
        try {
            const workPlace: WorkPlacesEntity=  await this.workPlacesRepository.save(body)
            if(!workPlace){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    messege:'Cannot create a Work Place'
                })
            } 
            return workPlace
        } catch (error) {
            throw new Error(error)
        }
    }
    public async findWorkPlaces():Promise<WorkPlacesEntity[]>{
        try {
            const places : WorkPlacesEntity[]= await this.workPlacesRepository.find()
            if(places.length === 0 ){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    messege:'Cannot find any Work Places'
                })
            }
            return places
        } catch (error) {
            throw new Error(error)
        }
    }
    public async findPlaceById(id:string):Promise<WorkPlacesEntity>{
        try {
            const places : WorkPlacesEntity= await this.workPlacesRepository
            .createQueryBuilder('workPlaces')
            .where({id})
            .getOne();

            if(!places){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    messege:`Cannot found a places with the id = ${id}`
                })
            }
            return places
        } catch (error) {
            throw new Error(error)
        }
    }
    public async updateWorkPlace(
        body: updateWorkPlacesDTO,
        id: string,
      ): Promise<UpdateResult | ErrorManager> {
        try {
          const workPlace: UpdateResult = await this.workPlacesRepository.update(
            id,
            body,
          );
          if (workPlace.affected === 0) {
            throw new ErrorManager({
                type:'NOT_MODIFIED',
                messege:`WorkPlace id ${id} `
            })
          }
          return workPlace;
        } catch (error) {
          throw new Error(error);
        }
      }
      public async deleteWorkPlace(id:string): Promise<DeleteResult >{
            try {
                const workPlace : DeleteResult = await this.workPlacesRepository.delete(id)
                if(workPlace.affected === 0 ){
                    throw new ErrorManager({
                        type:'BAD_REQUEST',
                        messege:'cannot delete'
                    })
                }
                return workPlace
            } catch (error) {
                throw new Error(error)
            }
      }
}
