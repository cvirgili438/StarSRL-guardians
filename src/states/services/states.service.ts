import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { StateDTO } from '../dto/state.dto';
import { StatesEntity } from '../entities/states.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(StatesEntity)
    private readonly stateRepository: Repository<StatesEntity>,
  ) {}
  public async createState(body: StateDTO): Promise<StatesEntity> {
    try {
      let state = await this.stateRepository.save(body);
      if (!state) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Not Created',
        });
      } else return state;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async getStates() {
    return await this.stateRepository.find();
  }
  public async getStateByName(name: string): Promise<StatesEntity[]> {
    let algo = await this.stateRepository.find({
      where: { name: ILike(name) },
    });
    return algo;
  }
  public async deleteState(id: string): Promise<DeleteResult> {
    try {
      const afected = await this.stateRepository.delete(id);
      if (afected.affected === 0) {
        throw new ErrorManager({
          message: 'Cannot Delete',
          type: 'SEE_OTHER',
        });
      }
      return afected;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
