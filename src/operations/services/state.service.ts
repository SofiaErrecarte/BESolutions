/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository
import { CreateStateDto, UpdateStateDto } from '../dtos/state.dtos';
import { State } from '../entities/state.entity';
@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State) private stateRepo: Repository<State>, //injectar Repository
  ) {}

  async findAll() {
    return await this.stateRepo.find();
  }

  async findOne(id: number) {
    const obj = this.stateRepo.findOne();
    if (!obj) {
      throw new NotFoundException(`State #${id} not found`);
    }
    return obj;
  }

  create(data: CreateStateDto) {
    const newObj = this.stateRepo.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    return this.stateRepo.save(newObj);
  }

  async update(id: number, changes: UpdateStateDto) {
    const obj = await this.stateRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.stateRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.stateRepo.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.stateRepo.delete(id);
  }
}
