import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
            return await this.workPlacesRepository.save(body)
        } catch (error) {
            throw new Error(error)
        }
    }
    public async findWorkPlaces():Promise<WorkPlacesEntity[]>{
        try {
            return this.workPlacesRepository.find()
        } catch (error) {
            throw new Error(error)
        }
    }
    public async findPlaceById(id:string):Promise<WorkPlacesEntity>{
        try {
            return this.workPlacesRepository
            .createQueryBuilder('workPlaces')
            .where({id})
            .getOne();
        } catch (error) {
            throw new Error(error)
        }
    }
    public async updateWorkPlace(
        body: updateWorkPlacesDTO,
        id: string,
      ): Promise<UpdateResult | undefined> {
        try {
          const workPlace: UpdateResult = await this.workPlacesRepository.update(
            id,
            body,
          );
          if (workPlace.affected === 0) {
            return undefined;
          }
          return workPlace;
        } catch (error) {
          throw new Error(error);
        }
      }
      public async deleteWorkPlace(id:string): Promise<DeleteResult | undefined>{
            try {
                const workPlace : DeleteResult = await this.workPlacesRepository.delete(id)
                if(workPlace.affected === 0 ){
                    return undefined
                }
                return workPlace
            } catch (error) {
                throw new Error(error)
            }
      }
}
