import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository
import {
  CreateOperationToStateDto,
  UpdateOperationToStateDto,
} from '../dtos/operationToState.dtos';
import { CreateStateDto, UpdateStateDto } from '../dtos/state.dtos';
import { Operation } from '../entities/operation.entity';
import { OperationToState } from '../entities/operationToState.entity';
import { State } from '../entities/state.entity';
@Injectable()
export class OperationToStateService {
  constructor(
    @InjectRepository(State) private stateRepo: Repository<State>,
    @InjectRepository(Operation) private operationRepo: Repository<Operation>,
    @InjectRepository(OperationToState)
    private opToStateRepo: Repository<OperationToState>,
  ) {}

  async findAll() {
    return await this.opToStateRepo.find();
  }

  async findOne(id: number) {
    const operationToState = await this.opToStateRepo.findOne(id, {
      relations: ['operation', 'state'], //cuando se busque un producto retornara con los objetos relacionados
    });
    if (!operationToState) {
      throw new NotFoundException(`OperationToState #${id} not found`);
    }
    return operationToState;
  }

  async create(data: CreateOperationToStateDto) {
    const newObj = this.opToStateRepo.create(data);
    if (data.operationId) {
      const obj = await this.operationRepo.findOne(data.operationId);
      newObj.operation = obj;
    }
    if (data.stateId) {
      const listObj = await this.stateRepo.findOne(data.stateId);
      newObj.state = listObj;
    }
    return this.opToStateRepo.save(newObj);
  }

  async update(id: number, changes: UpdateOperationToStateDto) {
    const obj = await this.opToStateRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.operationId) {
      const objRel = await this.operationRepo.findOne(changes.operationId);
      obj.operation = objRel;
    }
    if (changes.stateId) {
      const listObj = await this.stateRepo.findOne(changes.stateId);
      obj.state = listObj;
    }
    this.opToStateRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.opToStateRepo.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.opToStateRepo.delete(id); //elimina el registro con el id correspondiente
  }
}
